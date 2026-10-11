from pydantic import BaseModel, Field
from typing import List, Optional


class Competitor(BaseModel):
    name: str = Field(description="Name of the competing product or company")
    url: Optional[str] = Field(default=None, description="Website URL of the competitor if discovered")
    description: str = Field(description="What this competitor does and their core value proposition")
    strengths: List[str] = Field(description="Key competitive strengths or established moat")
    weaknesses: List[str] = Field(description="Vulnerabilities or gaps this competitor leaves unaddressed")
    pricing_model: Optional[str] = Field(default=None, description="Observed pricing structure (e.g. freemium, usage-based, enterprise)")


class FatalAssumption(BaseModel):
    assumption: str = Field(description="The unvalidated belief the founder is betting on")
    risk_level: str = Field(description="Risk severity: Critical, High, or Medium")
    failure_mode: str = Field(description="Why and how this assumption could collapse the business")
    mitigation_strategy: str = Field(description="Lean test or validation experiment to verify this before writing code")


class ValidationReport(BaseModel):
    startup_name: Optional[str] = Field(default="Proposed Startup", description="Name or working title of the startup concept")
    pitch_summary: str = Field(description="Crisp, executive summary of the pitch and target problem")
    viability_score: int = Field(ge=0, le=100, description="Ruthless market viability score from 0 to 100 based on validation findings")
    viability_verdict: str = Field(description="Verdict (e.g., 'Do Not Build / Pivot', 'High Friction / Niche Viable', 'Promising Market Gap')")
    market_gap: str = Field(description="The validated wedge or unserved white space where this startup could win")
    target_audience_analysis: str = Field(description="Analysis of the ICP (ideal customer profile), urgency of pain, and willingness to pay")
    competitors: List[Competitor] = Field(description="Identified direct and indirect competitors found during market research")
    fatal_assumptions: List[FatalAssumption] = Field(description="Ruthless breakdown of fatal assumptions and flaws in the founder's thesis")
    mvp_roadmap: List[str] = Field(description="Actionable 3-4 week lean validation milestones to build an MVP with minimal capital")
    key_recommendations: List[str] = Field(description="Tactical recommendations on what to prioritize or pivot immediately")
