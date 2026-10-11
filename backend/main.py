"""
ValidateAI FastAPI Application.
Provides REST API endpoints for startup pitch validation, live market research,
and structured due-diligence report generation.
"""
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from schemas import ValidationReport
from agent import validate_startup_pitch

app = FastAPI(
    title="ValidateAI API",
    description="Autonomous Early-Stage Startup Validation Engine using Antigravity Agent SDK",
    version="1.0.0",
)

# Enable CORS for local development and frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ValidatePitchRequest(BaseModel):
    pitch: str = Field(..., min_length=10, description="The startup idea, pitch, or product description to validate.")
    api_key: Optional[str] = Field(default=None, description="Optional Google Gemini API key to override environment settings.")


@app.get("/api/health")
async def health_check():
    """Health check endpoint to verify backend operational readiness."""
    return {"status": "ok", "service": "ValidateAI Backend", "version": "1.0.0"}


@app.post("/api/validate", response_model=ValidationReport)
async def validate_pitch_endpoint(request: ValidatePitchRequest):
    """
    Validates an early-stage startup pitch.
    Triggers live market search via DuckDuckGo, competitor scraping via Crawl4AI,
    and returns a structured market viability report with Pydantic validation.
    """
    try:
        report = await validate_startup_pitch(pitch=request.pitch, api_key=request.api_key)
        return report
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Validation pipeline error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
