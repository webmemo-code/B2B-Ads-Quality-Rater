"""FastAPI Main Application"""

from fastapi import FastAPI, HTTPException, Request as FastAPIRequest, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, HttpUrl, field_validator
from typing import Optional, Union, AsyncGenerator
from datetime import datetime
import sys
import os
import json
import asyncio
import tempfile
from io import StringIO, BytesIO
from contextlib import redirect_stdout, redirect_stderr

# Add src to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from crew.crew import AdQualityRaterCrew
from models.ad_quality_report import AdQualityReport
from utils.logger import logger

app = FastAPI(
    title="Ads Quality Rater API",
    version="1.0.0",
    description="KI-basierte Bewertung von Ad-LP-Kohärenz und Markenkonformität",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request Models
class AnalysisRequest(BaseModel):
    """Request model for ad analysis"""

    ad_url: str  # Can be URL or base64 data URL (for screenshots)
    landing_page_url: HttpUrl
    brand_guidelines: Optional[dict] = None
    target_audience: Optional[str] = None
    campaign_goal: Optional[str] = None  # z.B. "Lead-Generierung", "Brand Awareness", "Conversions"

    @field_validator('ad_url')
    @classmethod
    def validate_ad_url(cls, v: str) -> str:
        """Validate ad_url - accepts regular URLs or base64 data URLs"""
        if not v:
            raise ValueError("ad_url cannot be empty")
        # Allow base64 data URLs (for screenshots) or regular URLs
        if v.startswith("data:image"):
            return v
        if v.startswith(("http://", "https://")):
            return v
        raise ValueError("ad_url must be a valid URL or base64 data URL")



class AnalysisResponse(BaseModel):
    """Response model for ad analysis"""

    analysis_id: str
    status: str
    report: Optional[AdQualityReport] = None
    error: Optional[str] = None


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Check if Gemini API key is set
        gemini_key = os.getenv("GEMINI_API_KEY")
        gemini_status = "healthy" if gemini_key else "unhealthy"

        overall = "healthy" if gemini_status == "healthy" else "degraded"

        return {
            "status": overall,
            "timestamp": datetime.now().isoformat(),
            "services": {
                "gemini": gemini_status,
            },
        }
    except Exception as e:
        logger.error("Health check failed", error=str(e))
        return {"status": "unhealthy", "error": str(e)}


@app.post("/api/v1/analyze", response_model=AnalysisResponse)
async def analyze_ad(request: AnalysisRequest):
    """
    Main endpoint: Start Ad Quality Analysis

    This endpoint initiates a complete analysis of an ad and its landing page,
    including visual analysis, copywriting evaluation, and brand compliance check.

    Args:
        request: AnalysisRequest with ad_url, landing_page_url, optional brand_guidelines

    Returns:
        AnalysisResponse with report or error
    """
    logger.info(
        "Analysis started",
        ad_url=str(request.ad_url),
        landing_page_url=str(request.landing_page_url),
    )

    try:
        # Create and execute crew
        crew = AdQualityRaterCrew(
            ad_url=str(request.ad_url),
            landing_page_url=str(request.landing_page_url),
            brand_guidelines=request.brand_guidelines,
            target_audience=request.target_audience,
            campaign_goal=request.campaign_goal,
        )

        result = crew.kickoff()

        logger.info(
            "Analysis completed",
            analysis_id=result.report_id,
            overall_score=result.overall_score,
            processing_time=result.processing_time_seconds,
        )

        return AnalysisResponse(
            analysis_id=result.report_id,
            status="completed" if result.success else "failed",
            report=result,
        )

    except Exception as e:
        logger.error("Analysis failed", error=str(e), ad_url=str(request.ad_url))
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.post("/api/v1/analyze/stream")
async def analyze_ad_stream(
    landing_page_url: str = Form(...),
    ad_url: Optional[str] = Form(None),
    ad_file: Optional[UploadFile] = File(None),
    brand_guidelines: Optional[str] = Form(None),
    target_audience: Optional[str] = Form(None),
    campaign_goal: Optional[str] = Form(None),
):
    """
    Streaming endpoint: Start Ad Quality Analysis with real-time logs

    Accepts either ad_url OR ad_file (uploaded image)
    Returns Server-Sent Events with logs and final result
    """
    # Validate that we have either ad_url or ad_file
    if not ad_url and not ad_file:
        raise HTTPException(status_code=400, detail="Either ad_url or ad_file must be provided")

    # Validate landing_page_url is accessible
    if not landing_page_url.startswith(("http://", "https://")):
        raise HTTPException(status_code=400, detail="landing_page_url must be a valid HTTP/HTTPS URL")

    # Parse brand guidelines if provided
    parsed_guidelines = None
    if brand_guidelines:
        try:
            parsed_guidelines = json.loads(brand_guidelines)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="brand_guidelines must be valid JSON")

    # Handle uploaded file by saving to temp location
    temp_file_path = None
    final_ad_url = ad_url

    if ad_file:
        # Validate file size (max 10MB)
        MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
        content = await ad_file.read()

        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail=f"File too large. Maximum size is 10MB, got {len(content) / (1024*1024):.1f}MB")

        # Validate it's actually an image
        if not ad_file.content_type or not ad_file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail=f"File must be an image, got {ad_file.content_type}")

        # Save to temporary file
        file_extension = os.path.splitext(ad_file.filename or "image.jpg")[1] or ".jpg"
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
            temp_file.write(content)
            temp_file_path = temp_file.name
        final_ad_url = temp_file_path  # Use temp file path

    async def event_generator() -> AsyncGenerator[str, None]:
        """Generate SSE events with logs and result"""
        import threading
        import queue
        import sys
        import time

        log_queue = queue.Queue()
        result_holder = {"result": None, "error": None}
        crew_running = threading.Event()

        def run_crew():
            """Run crew in thread and capture ALL output"""
            try:
                # Capture console output periodically
                from io import StringIO
                import sys

                # Create string buffer for output
                output_buffer = StringIO()

                # Redirect stdout/stderr
                old_stdout = sys.stdout
                old_stderr = sys.stderr
                sys.stdout = output_buffer
                sys.stderr = output_buffer

                crew_running.set()

                # Create crew and start analysis
                crew = AdQualityRaterCrew(
                    ad_url=final_ad_url,
                    landing_page_url=landing_page_url,
                    brand_guidelines=parsed_guidelines,
                    target_audience=target_audience,
                    campaign_goal=campaign_goal,
                )

                # Start a thread to periodically flush output
                last_position = [0]  # Use list to make it mutable in closure
                stop_flushing = threading.Event()

                def flush_output():
                    while not stop_flushing.is_set():
                        try:
                            output_buffer.seek(last_position[0])
                            new_content = output_buffer.read()
                            if new_content:
                                # Split into lines and send each
                                for line in new_content.splitlines():
                                    if line.strip():
                                        log_queue.put({"type": "log", "data": line})
                                last_position[0] = output_buffer.tell()
                            time.sleep(0.1)  # Check every 100ms
                        except:
                            pass

                flush_thread = threading.Thread(target=flush_output, daemon=True)
                flush_thread.start()

                # Run the crew (this blocks) - now returns text
                result_text = crew.kickoff()
                result_holder["result"] = result_text

                # Cleanup temp file if it was created
                if temp_file_path and os.path.exists(temp_file_path):
                    try:
                        os.unlink(temp_file_path)
                    except:
                        pass  # Ignore cleanup errors

                # Stop flushing thread and get final output
                stop_flushing.set()
                flush_thread.join(timeout=1)

                # Get any remaining output
                output_buffer.seek(last_position[0])
                remaining = output_buffer.read()
                if remaining:
                    for line in remaining.splitlines():
                        if line.strip():
                            log_queue.put({"type": "log", "data": line})

                # Restore stdout/stderr
                sys.stdout = old_stdout
                sys.stderr = old_stderr

            except Exception as e:
                result_holder["error"] = str(e)
                log_queue.put({"type": "error", "data": str(e)})
                # Make sure to restore stdout/stderr on error
                try:
                    sys.stdout = old_stdout
                    sys.stderr = old_stderr
                except:
                    pass
            finally:
                crew_running.clear()
                log_queue.put({"type": "done"})

        # Start crew in background thread
        crew_thread = threading.Thread(target=run_crew, daemon=True)
        crew_thread.start()

        # Stream logs as they come
        while True:
            try:
                event = log_queue.get(timeout=0.1)

                if event["type"] == "done":
                    # Send final result (now text instead of JSON object)
                    if result_holder["result"]:
                        result_text = result_holder["result"]
                        yield f"data: {json.dumps({'type': 'result', 'data': result_text})}\n\n"
                    elif result_holder["error"]:
                        yield f"data: {json.dumps({'type': 'error', 'data': result_holder['error']})}\n\n"
                    break
                else:
                    yield f"data: {json.dumps(event)}\n\n"

            except queue.Empty:
                # Send heartbeat
                yield f"data: {json.dumps({'type': 'heartbeat'})}\n\n"
                await asyncio.sleep(0.1)

        crew_thread.join(timeout=1)

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        }
    )


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Ads Quality Rater API",
        "version": "1.0.0",
        "docs": "/docs",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
