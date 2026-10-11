import React, { useState } from 'react';
import {
  ShieldAlert,
  TrendingUp,
  Globe,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Lightbulb,
  Copy,
  Check,
  RefreshCw,
  Target,
  Layers,
  ChevronRight,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export default function ReportDashboard({ report, onReset }) {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const {
    startup_name,
    pitch_summary,
    viability_score,
    viability_verdict,
    market_gap,
    target_audience_analysis,
    competitors = [],
    fatal_assumptions = [],
    mvp_roadmap = [],
    key_recommendations = [],
  } = report;

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(report, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Score styling logic
  const getScoreColor = (score) => {
    if (score >= 70) return {
      text: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-500/10',
      glow: 'shadow-emerald-500/20',
      bar: 'bg-emerald-500'
    };
    if (score >= 50) return {
      text: 'text-amber-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-500/10',
      glow: 'shadow-amber-500/20',
      bar: 'bg-amber-500'
    };
    return {
      text: 'text-rose-400',
      border: 'border-rose-500/40',
      bg: 'bg-rose-500/10',
      glow: 'shadow-rose-500/20',
      bar: 'bg-rose-500'
    };
  };

  const scoreTheme = getScoreColor(viability_score);

  return (
    <div id="report-dashboard-container" className="w-full max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider font-mono">
            Autonomous Due-Diligence Report
          </span>
          <h2 className="text-2xl font-bold text-white mt-0.5">
            {startup_name || "Startup Market Validation"}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            id="copy-json-button"
            onClick={handleCopyJSON}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied JSON' : 'Export JSON'}</span>
          </button>

          <button
            type="button"
            id="validate-another-pitch-button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Validate Another Pitch</span>
          </button>
        </div>
      </div>

      {/* Hero Viability Score & Verdict Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score Radial Box */}
        <div className={`lg:col-span-4 glass-panel-glow rounded-2xl p-6 flex flex-col items-center justify-center text-center relative border ${scoreTheme.border}`}>
          <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-4">
            Market Viability Score
          </div>

          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
            {/* SVG Radial Gauge */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#1f2937"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * viability_score) / 100}
                strokeLinecap="round"
                className={`${scoreTheme.text} transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-extrabold tracking-tight ${scoreTheme.text}`}>
                {viability_score}
              </span>
              <span className="text-xs text-slate-500 font-mono">/ 100</span>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${scoreTheme.bg} ${scoreTheme.text} border ${scoreTheme.border} mb-2`}>
            {viability_verdict}
          </div>
          <p className="text-[11px] text-slate-400 max-w-xs mt-1">
            Calculated via competitive density, switching costs, and unvalidated distribution dependencies.
          </p>
        </div>

        {/* Pitch Synthesis & Market Gap */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                Pitch Synthesis
              </span>
              <p className="mt-1.5 text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
                "{pitch_summary}"
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                Validated Market Gap & Strategic Wedge
              </span>
              <p className="mt-1.5 text-sm sm:text-base text-slate-300 leading-relaxed bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-500/20">
                {market_gap}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              Target Audience & ICP Willingness to Pay
            </span>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {target_audience_analysis}
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Discovered Competitors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Discovered Competitors & Landscape
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {competitors.length} Detected
            </span>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Sourced via DuckDuckGo & Crawl4AI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competitors.map((comp, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-xl p-5 border border-slate-800 hover:border-slate-700 transition-all space-y-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-base font-semibold text-white group flex items-center gap-1.5">
                    {comp.name}
                  </h4>
                  {comp.url && (
                    <a
                      href={comp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 px-2 py-1 rounded bg-sky-500/10 border border-sky-500/20 hover:border-sky-500/40 transition-colors shrink-0"
                    >
                      <span>Visit</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {comp.pricing_model && (
                  <div className="mt-1">
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Pricing: {comp.pricing_model}
                    </span>
                  </div>
                )}

                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {comp.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                <div>
                  <span className="font-semibold text-emerald-400 text-[11px] uppercase tracking-wider block mb-1">
                    Moat & Strengths:
                  </span>
                  <ul className="space-y-1">
                    {comp.strengths?.map((str, sIdx) => (
                      <li key={sIdx} className="text-slate-400 flex items-start gap-1.5">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-semibold text-rose-400 text-[11px] uppercase tracking-wider block mb-1">
                    Gaps & Vulnerabilities:
                  </span>
                  <ul className="space-y-1">
                    {comp.weaknesses?.map((w, wIdx) => (
                      <li key={wIdx} className="text-slate-400 flex items-start gap-1.5">
                        <span className="text-rose-400 mt-0.5">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Fatal Assumptions Warning Matrix */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Fatal Assumptions & Failure Modes
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
            Ruthless Stress-Test
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fatal_assumptions.map((item, idx) => {
            const isCritical = item.risk_level?.toLowerCase() === 'critical';
            const isHigh = item.risk_level?.toLowerCase() === 'high';
            const badgeColor = isCritical
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              : isHigh
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';

            return (
              <div
                key={idx}
                className="glass-panel rounded-xl p-5 border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${badgeColor}`}>
                      {item.risk_level} Risk
                    </span>
                    <AlertTriangle className={`w-3.5 h-3.5 ${isCritical ? 'text-rose-400' : 'text-amber-400'}`} />
                  </div>

                  <h4 className="text-sm font-semibold text-slate-100">
                    "{item.assumption}"
                  </h4>

                  <div className="mt-3 p-3 rounded-lg bg-rose-950/20 border border-rose-500/20">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-300 block mb-0.5">
                      Failure Mode (How It Dies):
                    </span>
                    <p className="text-xs text-rose-200/90 leading-relaxed">
                      {item.failure_mode}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-300 block mb-0.5">
                    De-Risking Experiment:
                  </span>
                  <p className="text-xs text-indigo-200/90 leading-relaxed">
                    {item.mitigation_strategy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: MVP Roadmap & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MVP Roadmap Timeline */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Lean 4-Week Validation & MVP Roadmap
            </h3>
          </div>

          <div className="space-y-3 mt-4">
            {mvp_roadmap.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Recommendations */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Founder Action Items
            </h3>
          </div>

          <div className="space-y-3 mt-4">
            {key_recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  {rec}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
