"""Playwright Scraping Tool for Landing Page Content Extraction"""

from crewai.tools import BaseTool
from typing import Type, Any
from pydantic import BaseModel, Field
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
import trafilatura


class PlaywrightScrapingToolInput(BaseModel):
    """Input schema for PlaywrightScrapingTool"""

    url: str = Field(..., description="URL of the landing page to scrape")
    timeout: int = Field(default=20000, description="Timeout in milliseconds")


class PlaywrightScrapingTool(BaseTool):
    name: str = "Playwright Landing Page Scraper"
    description: str = """Scrapes full text content from landing pages.
    Supports JavaScript-rendered pages, handles cookie banners, lazy loading.
    Input: URL
    Output: Extracted text content"""
    args_schema: Type[BaseModel] = PlaywrightScrapingToolInput

    def _run(
        self,
        url: str,
        timeout: int = 20000,  # Reduced from 30s to 20s
        **kwargs: Any,
    ) -> dict:
        """
        Scrape landing page content

        Args:
            url: Landing page URL
            timeout: Timeout in milliseconds

        Returns:
            dict with scraped content
        """
        try:
            with sync_playwright() as p:
                # Launch with faster settings
                browser = p.chromium.launch(
                    headless=True,
                    args=['--disable-blink-features=AutomationControlled']
                )
                context = browser.new_context(
                    viewport={'width': 1280, 'height': 720},
                    user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                )
                page = context.new_page()

                try:
                    # Navigate to page - use domcontentloaded (faster than networkidle)
                    page.goto(url, wait_until="domcontentloaded", timeout=timeout)

                    # Quick cookie banner handling (try first match only, don't iterate all)
                    try:
                        page.click(
                            'button:has-text("Accept"), button:has-text("Akzeptieren"), #onetrust-accept-btn-handler',
                            timeout=1000  # Only wait 1 second
                        )
                    except:
                        pass  # No cookie banner or already accepted

                    # Scroll to bottom (trigger lazy loading) with shorter wait
                    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                    page.wait_for_timeout(500)  # Reduced from 2s to 0.5s

                    # Get HTML
                    html = page.content()

                    # Extract text with trafilatura
                    text = trafilatura.extract(
                        html,
                        include_comments=False,
                        include_tables=True,
                        no_fallback=False,
                    )

                    if not text:
                        # Fallback: get all text
                        text = page.inner_text("body")

                    return {
                        "success": True,
                        "url": url,
                        "text": text,
                        "text_length": len(text) if text else 0,
                    }

                except PlaywrightTimeout:
                    return {
                        "success": False,
                        "url": url,
                        "error": f"Page load timeout ({timeout}ms)",
                    }
                except Exception as e:
                    return {
                        "success": False,
                        "url": url,
                        "error": f"Scraping failed: {str(e)}",
                    }
                finally:
                    context.close()
                    browser.close()

        except Exception as e:
            return {
                "success": False,
                "url": url,
                "error": f"Browser launch failed: {str(e)}",
            }

    async def _arun(
        self,
        url: str,
        timeout: int = 30000,
        **kwargs: Any,
    ) -> dict:
        """Async version - falls back to sync for now"""
        return self._run(url, timeout, **kwargs)
