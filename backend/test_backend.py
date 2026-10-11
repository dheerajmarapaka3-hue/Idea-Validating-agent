"""
Integration test for ValidateAI Backend Pipeline.
Validates end-to-end execution of live tools, data schemas, and report generation.
"""
import asyncio
import json
from agent import validate_startup_pitch
from schemas import ValidationReport


async def run_test():
    test_pitch = (
        "AI-driven automated code security and architecture review bot for GitHub PRs. "
        "It acts as a senior staff engineer reviewing pull requests for secret leaks, "
        "memory leaks, concurrency bugs, and architectural design violations in real time."
    )
    print("=" * 60)
    print("TESTING VALIDATEAI PIPELINE WITH LIVE TOOLS")
    print("PITCH:", test_pitch)
    print("=" * 60)

    report = await validate_startup_pitch(test_pitch)
    
    assert isinstance(report, ValidationReport), "Output must be a ValidationReport instance"
    assert 0 <= report.viability_score <= 100, f"Viability score {report.viability_score} out of bounds"
    assert len(report.competitors) > 0, "Competitors list should not be empty"
    assert len(report.fatal_assumptions) > 0, "Fatal assumptions should not be empty"
    assert len(report.mvp_roadmap) > 0, "MVP roadmap should not be empty"

    print("\n--- VALIDATION REPORT GENERATED SUCCESSFULLY ---")
    print(f"Startup Name: {report.startup_name}")
    print(f"Viability Score: {report.viability_score}/100 ({report.viability_verdict})")
    print(f"Market Gap: {report.market_gap[:120]}...")
    print(f"\nDiscovered Competitors ({len(report.competitors)}):")
    for comp in report.competitors[:3]:
        print(f" - {comp.name} ({comp.url or 'N/A'}): {comp.description[:80]}...")
    print(f"\nFatal Assumptions ({len(report.fatal_assumptions)}):")
    for fa in report.fatal_assumptions[:2]:
        print(f" - [{fa.risk_level}] {fa.assumption}")
    print(f"\nMVP Roadmap ({len(report.mvp_roadmap)} steps):")
    for step in report.mvp_roadmap[:2]:
        print(f" - {step}")
    
    # Verify JSON serialization
    json_str = report.model_dump_json(indent=2)
    assert json.loads(json_str), "JSON serialization must be valid"
    print("\n[SUCCESS] Report matches Pydantic JSON schema perfectly!")
    return True


if __name__ == "__main__":
    success = asyncio.run(run_test())
    if success:
        print("\nALL BACKEND CHECKS PASSED.")
