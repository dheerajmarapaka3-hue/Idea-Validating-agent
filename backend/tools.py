"""
Validation Engine Tools for Market Discovery and Competitor Scraping.
Includes robust error handling and fallback mechanism so external failures
never crash the agent pipeline.
"""
import asyncio
import re
import urllib.request
from typing import Optional
try:
    from ddgs import DDGS
except ImportError:
    from duckduckgo_search import DDGS
from crawl4ai import AsyncWebCrawler


def tool(fn):
    """Antigravity tool decorator compatible with custom function tools."""
    fn.__tool__ = True
    return fn


@tool
def search_market(query: str) -> str:
    """Searches the live web for competitors, market trends, user pain points, and existing solutions.

    Args:
        query: Specific search query for competitor discovery or market research.
    """
    try:
        results = []
        with DDGS() as ddgs:
            raw_results = ddgs.text(query, max_results=6)
            for item in raw_results:
                title = item.get("title", "No Title")
                link = item.get("href", "")
                snippet = item.get("body", "")
                results.append(f"Title: {title}\nURL: {link}\nSnippet: {snippet}")

        if not results:
            return f"No search results found for query: '{query}'."
        return "\n\n---\n\n".join(results)
    except Exception as e:
        return f"Warning: Search execution encountered error for '{query}': {str(e)}"


@tool
async def scrape_competitor(url: str) -> str:
    """Scrapes a competitor website or landing page and extracts clean markdown content for deep analysis.

    Args:
        url: The web URL of the competitor landing page to scrape.
    """
    if not url:
        return "Error: No URL provided for scraping."

    clean_url = url.strip()
    if not clean_url.startswith("http://") and not clean_url.startswith("https://"):
        clean_url = f"https://{clean_url}"

    # Primary attempt: crawl4ai AsyncWebCrawler with tight timeout
    try:
        async with AsyncWebCrawler(verbose=False) as crawler:
            crawl_task = crawler.arun(url=clean_url)
            crawl_result = await asyncio.wait_for(crawl_task, timeout=8.0)
            if crawl_result and crawl_result.markdown:
                markdown_text = crawl_result.markdown.strip()
                if len(markdown_text) > 3000:
                    markdown_text = markdown_text[:3000] + "\n\n...[Content truncated for length]..."
                return markdown_text
            elif crawl_result and crawl_result.cleaned_html:
                return crawl_result.cleaned_html[:2500]
    except Exception:
        pass

    # Resilient fallback: standard HTTP GET with browser header to extract clean text
    try:
        req = urllib.request.Request(
            clean_url,
            headers={
                "User-Agent": (
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
                )
            },
        )
        with urllib.request.urlopen(req, timeout=5) as response:
            html = response.read().decode("utf-8", errors="ignore")
            cleaned = re.sub(
                r"<(script|style|svg|noscript|nav|footer).*?</\1>",
                "",
                html,
                flags=re.DOTALL | re.IGNORECASE,
            )
            cleaned = re.sub(r"<[^>]+>", " ", cleaned)
            condensed = " ".join(cleaned.split())
            if len(condensed) > 3000:
                condensed = condensed[:3000] + "\n\n...[Content truncated for length]..."
            return f"[Extracted Landing Page Content from {clean_url}]:\n{condensed}"
    except Exception as fallback_err:
        return f"Warning: Could not scrape '{clean_url}'. Error: {str(fallback_err)}"
