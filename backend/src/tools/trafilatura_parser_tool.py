"""Trafilatura Parser Tool - Fast Path for Static Pages"""

from crewai.tools import BaseTool
from typing import Type, Any
from pydantic import BaseModel, Field
import trafilatura
import requests


class TrafilaturaParserToolInput(BaseModel):
    """Input schema for TrafilaturaParserTool"""

    url: str = Field(..., description="URL to parse")


class TrafilaturaParserTool(BaseTool):
    name: str = "Trafilatura Fast Parser"
    description: str = """Fast text extraction for static HTML pages.
    Use this as a fallback when Playwright is too slow or fails.
    Input: URL
    Output: Extracted text content"""
    args_schema: Type[BaseModel] = TrafilaturaParserToolInput

    def _run(
        self,
        url: str,
        **kwargs: Any,
    ) -> dict:
        """
        Extract text using trafilatura

        Args:
            url: URL to parse

        Returns:
            dict with extracted content
        """
        try:
            # Download page
            downloaded = trafilatura.fetch_url(url)

            if not downloaded:
                return {
                    "success": False,
                    "url": url,
                    "error": "Failed to download page",
                }

            # Extract text
            text = trafilatura.extract(
                downloaded,
                include_comments=False,
                include_tables=True,
                no_fallback=False,
            )

            if not text:
                return {
                    "success": False,
                    "url": url,
                    "error": "Failed to extract text content",
                }

            return {
                "success": True,
                "url": url,
                "text": text,
                "text_length": len(text),
            }

        except Exception as e:
            return {
                "success": False,
                "url": url,
                "error": f"Parsing failed: {str(e)}",
            }

    async def _arun(
        self,
        url: str,
        **kwargs: Any,
    ) -> dict:
        """Async version - falls back to sync for now"""
        return self._run(url, **kwargs)
