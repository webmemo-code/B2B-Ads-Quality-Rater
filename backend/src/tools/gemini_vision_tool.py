"""Gemini Vision Tool for Ad Image Analysis"""

from crewai.tools import BaseTool
from typing import Type, Optional, Any
from pydantic import BaseModel, Field, PrivateAttr
from google import genai
from google.genai import types
import requests
import os
import base64
import re
import time


class GeminiVisionToolInput(BaseModel):
    """Input schema for GeminiVisionTool"""

    image_url: Optional[str] = Field(None, description="URL or local path to the image")
    image_bytes: Optional[bytes] = Field(None, description="Raw image bytes (alternative to image_url)")
    mime_type: Optional[str] = Field(None, description="MIME type when using image_bytes (e.g., 'image/jpeg', 'image/png')")
    prompt: Optional[str] = Field(None, description="Analysis prompt for the vision model. If not provided, uses default ad analysis prompt.")


class GeminiVisionTool(BaseTool):
    name: str = "Gemini Vision Analyzer"
    description: str = """Analyzes advertisement images using Gemini 2.5 Flash Vision.

    REQUIRED Parameter:
    - image_url (string): The URL, local file path, or data URL to the ad image

    OPTIONAL Parameter:
    - prompt (string): Custom analysis instructions. If not provided, uses comprehensive ad analysis.

    SIMPLE USAGE - Just provide the image URL:
    {"image_url": "/tmp/tmpX1Y2Z3.jpg"}

    Returns: JSON with 'success' (bool), 'analysis' (string), and 'image_source' (string)
    The analysis includes: colors, composition quality, emotional tone, CTA visibility, and brand elements."""
    args_schema: Type[BaseModel] = GeminiVisionToolInput

    # Use PrivateAttr for internal state
    _model_name: str = PrivateAttr()
    _model: Any = PrivateAttr()

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Configure Gemini
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set")
        self._model_name = os.getenv("MODEL", "gemini-2.5-flash")
        self._model = genai.Client(api_key=api_key)

    def _run(
        self,
        image_url: Optional[str] = None,
        prompt: Optional[str] = None,
        image_bytes: Optional[bytes] = None,
        mime_type: Optional[str] = None,
        **kwargs: Any,
    ) -> dict:
        """
        Analyze image with Gemini Vision using proper SDK methods

        Args:
            image_url: URL, local path, or base64 data URL to image (optional if image_bytes provided)
            prompt: Analysis prompt (optional, uses default ad analysis prompt if not provided)
            image_bytes: Raw image bytes (optional if image_url provided)
            mime_type: MIME type when using image_bytes

        Returns:
            dict with analysis results
        """
        try:
            # Use default prompt if none provided
            if not prompt:
                prompt = """Analysiere dieses Werbemotiv detailliert und extrahiere:

1. Dominante Farben (als Hex-Codes, z.B. #FF5733)
2. Bildkomposition-Qualität (Score 0-100)
3. Emotionale Tonalität und Wirkung
4. Call-to-Action Sichtbarkeit (Score 0-100)
5. Präsenz von Markenelementen (Logo, Slogan, etc.)

Gib die Analyse in strukturiertem Format zurück."""
            # Validate inputs
            if not image_url and not image_bytes:
                return {
                    "success": False,
                    "error": "Either image_url or image_bytes must be provided",
                }

            # If bytes are provided directly, use them
            if image_bytes:
                final_mime_type = mime_type or "image/jpeg"
                final_bytes = image_bytes
                display_source = "[Uploaded Image]"

            # Otherwise, fetch from URL
            else:
                display_source = image_url if not image_url.startswith("data:image") else "[Base64 Data URL]"

                if image_url.startswith("data:image"):
                    # Base64 data URL (from screenshot upload)
                    match = re.match(r'data:(image/\w+);base64,(.+)', image_url)
                    if match:
                        final_mime_type = match.group(1)
                        base64_data = match.group(2)
                    else:
                        final_mime_type = "image/jpeg"
                        base64_data = re.sub('^data:image/.+;base64,', '', image_url)

                    final_bytes = base64.b64decode(base64_data)

                elif image_url.startswith(("http://", "https://")):
                    # Fetch from URL
                    response = requests.get(image_url, timeout=30)
                    response.raise_for_status()
                    final_bytes = response.content

                    # Detect MIME type from URL
                    final_mime_type = "image/jpeg"  # default
                    if image_url.lower().endswith('.png'):
                        final_mime_type = "image/png"
                    elif image_url.lower().endswith('.gif'):
                        final_mime_type = "image/gif"
                    elif image_url.lower().endswith('.webp'):
                        final_mime_type = "image/webp"

                else:
                    # Local file
                    with open(image_url, 'rb') as f:
                        final_bytes = f.read()

                    # Detect MIME type from file extension
                    final_mime_type = "image/jpeg"  # default
                    if image_url.lower().endswith('.png'):
                        final_mime_type = "image/png"
                    elif image_url.lower().endswith('.gif'):
                        final_mime_type = "image/gif"
                    elif image_url.lower().endswith('.webp'):
                        final_mime_type = "image/webp"

            # Validate image size (max 10MB for Gemini)
            MAX_IMAGE_SIZE = 10 * 1024 * 1024
            if len(final_bytes) > MAX_IMAGE_SIZE:
                return {
                    "success": False,
                    "error": f"Image too large for analysis. Maximum size is 10MB, got {len(final_bytes) / (1024*1024):.1f}MB",
                    "image_source": display_source,
                }

            # Create Part from bytes (proper Gemini SDK method)
            image_part = types.Part.from_bytes(
                data=final_bytes,
                mime_type=final_mime_type
            )

            # Generate analysis with retry logic (up to 3 attempts)
            max_retries = 3
            last_error = None

            for attempt in range(max_retries):
                try:
                    response = self._model.models.generate_content(
                        model=self._model_name,
                        contents=[prompt, image_part],
                        config=types.GenerateContentConfig(
                            temperature=0.1,
                            max_output_tokens=2048,
                        )
                    )

                    # Debug: Log response structure
                    print(f"[DEBUG] Gemini response received (attempt {attempt + 1})")
                    print(f"[DEBUG] Has candidates: {hasattr(response, 'candidates')}")

                    # Check if response has text
                    if not hasattr(response, 'text') or not response.text or response.text.strip() == "":
                        # Check for safety ratings or blocked content
                        if hasattr(response, 'candidates') and response.candidates:
                            candidate = response.candidates[0]
                            print(f"[DEBUG] Candidate finish_reason: {getattr(candidate, 'finish_reason', 'None')}")
                            print(f"[DEBUG] Candidate safety_ratings: {getattr(candidate, 'safety_ratings', 'None')}")

                            if hasattr(candidate, 'finish_reason'):
                                finish_reason = str(candidate.finish_reason)
                                return {
                                    "success": False,
                                    "error": f"Gemini konnte das Bild nicht analysieren (Grund: {finish_reason}). Möglicherweise wurde das Bild durch Sicherheitsfilter blockiert. Bitte versuche ein anderes Bild.",
                                    "image_source": display_source,
                                }

                        print(f"[DEBUG] Empty response, no finish_reason found")
                        return {
                            "success": False,
                            "error": "Gemini konnte keine Analyse erstellen. Das Bild könnte zu klein, unklar oder durch Filter blockiert sein. Bitte versuche ein anderes Bild.",
                            "image_source": display_source,
                        }

                    print(f"[DEBUG] Success! Analysis length: {len(response.text)} chars")
                    return {
                        "success": True,
                        "analysis": response.text,
                        "image_source": display_source,
                    }

                except Exception as e:
                    last_error = e
                    print(f"[DEBUG] Attempt {attempt + 1} failed: {str(e)}")
                    if attempt < max_retries - 1:
                        # Exponential backoff: 1s, 2s
                        wait_time = 2 ** attempt
                        print(f"[DEBUG] Retrying in {wait_time}s...")
                        time.sleep(wait_time)
                        continue
                    else:
                        # All retries failed
                        print(f"[DEBUG] All retries failed. Last error: {str(e)}")
                        raise

        except requests.exceptions.RequestException as e:
            error_source = "[Image]"
            if image_url and not image_url.startswith("data:image"):
                error_source = image_url
            elif image_bytes:
                error_source = "[Uploaded Image]"

            return {
                "success": False,
                "error": f"Failed to fetch image: {str(e)}",
                "image_source": error_source,
            }
        except Exception as e:
            error_source = "[Image]"
            if image_url and not image_url.startswith("data:image"):
                error_source = image_url
            elif image_bytes:
                error_source = "[Uploaded Image]"

            return {
                "success": False,
                "error": f"Analysis failed: {str(e)}",
                "image_source": error_source,
            }

    async def _arun(
        self,
        image_url: Optional[str] = None,
        prompt: Optional[str] = None,
        image_bytes: Optional[bytes] = None,
        mime_type: Optional[str] = None,
        **kwargs: Any,
    ) -> dict:
        """Async version - falls back to sync for now"""
        return self._run(image_url=image_url, prompt=prompt, image_bytes=image_bytes, mime_type=mime_type, **kwargs)
