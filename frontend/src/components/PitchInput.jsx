import React, { useState } from 'react';
import { Sparkles, ArrowRight, Key, Info, Zap, ShieldAlert, Cpu } from 'lucide-react';

const PRESET_PITCHES = [
  {
    title: "AI PR Code Reviewer",
    pitch: "An autonomous AI bot integrated into GitHub PRs that acts like a senior Staff Engineer—analyzing pull requests for secret leaks, memory leaks, concurrency race conditions, and architectural design violations before merging."
  },
  {
    title: "Vertical ERP for Rooftop Solar",
    pitch: "An all-in-one vertical SaaS platform for residential solar installers that unifies customer financing approval, aerial CAD roof design generation, local municipal permitting automation, and subcontractor field scheduling."
  },
  {
    title: "B2B SaaS Churn Predictor",
    pitch: "A zero-code telemetry engine that monitors customer product usage drop-offs, billing events, and support ticket sentiment to trigger automated retention playbook sequences before enterprise accounts churn."
  }
];

export default function PitchInput({ onValidate, isLoading, apiKey, setApiKey }) {
  const [pitch, setPitch] = useState('');
  const [showKeyConfig, setShowKeyConfig] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pitch.trim() || isLoading) return;
    onValidate(pitch.trim());
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSelectPreset = (presetPitch) => {
    setPitch(presetPitch);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Hero Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Autonomous Due-Diligence Engine
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Validate Your Startup Idea <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Before Spending Months Building
          </span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
          Our ruthless AI due-diligence agent searches the live web for real competitors, scrapes their landing pages, tears apart fatal assumptions, and scores your market viability.
        </p>
      </div>

      {/* Main Pitch Card */}
      <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="pitch-input-textarea" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                Startup Pitch or Business Concept
              </label>
              <span className="text-xs text-slate-500 font-mono">
                {pitch.length} chars (min 20)
              </span>
            </div>
            
            <div className="relative">
              <textarea
                id="pitch-input-textarea"
                rows={5}
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Describe your startup idea in detail: What is the core problem? Who is the target customer? What is your proposed solution and pricing model?"
                className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 px-4 py-3.5 text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-y min-h-[130px] leading-relaxed shadow-inner"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Or try an example startup thesis:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_PITCHES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  id={`preset-button-${idx}`}
                  onClick={() => handleSelectPreset(preset.pitch)}
                  className="text-xs bg-slate-800/80 hover:bg-indigo-950/60 hover:border-indigo-500/50 border border-slate-700/60 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-all text-left flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="font-semibold text-indigo-300">{preset.title}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-800">
            {/* Optional API Key Toggle */}
            <div className="relative">
              <button
                type="button"
                id="toggle-api-key-button"
                onClick={() => setShowKeyConfig(!showKeyConfig)}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Key className="w-3.5 h-3.5 text-indigo-400" />
                <span>Custom Gemini API Key</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">Optional</span>
              </button>

              {showKeyConfig && (
                <div className="mt-2 sm:absolute sm:bottom-8 sm:left-0 z-20 w-full sm:w-80 p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-xl space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-medium">Google Gemini Key</span>
                    <a
                      href="https://aistudio.google.com/app/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline text-[11px]"
                    >
                      Get Key &rarr;
                    </a>
                  </div>
                  <input
                    type="password"
                    id="api-key-input"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Passed to Antigravity SDK. If empty, the engine uses backend configuration.
                  </p>
                </div>
              )}
            </div>

            {/* Launch Button */}
            <button
              type="submit"
              id="validate-pitch-button"
              disabled={isLoading || pitch.trim().length < 15}
              className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white transition-all shadow-lg cursor-pointer ${
                isLoading || pitch.trim().length < 15
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/25 border border-indigo-400/30 hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Autonomous Validation</span>
              <span className="text-xs opacity-75 font-mono hidden sm:inline">(Ctrl+Enter)</span>
            </button>
          </div>
        </form>
      </div>

      {/* Trust & Methodology Features */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-400 text-xs">
        <div className="glass-panel rounded-xl p-3.5 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-200">Live DuckDuckGo Search</h4>
            <p className="text-slate-400 mt-0.5">Queries search engines in real time for existing software, open-source repos, and pricing models.</p>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-3.5 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-200">Crawl4AI Landing Page Scraper</h4>
            <p className="text-slate-400 mt-0.5">Scrapes discovered competitor websites to analyze their actual feature sets and value claims.</p>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-3.5 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-200">Objective Due Diligence</h4>
            <p className="text-slate-400 mt-0.5">Tears down unvalidated assumptions and outputs a structured Pydantic market report.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
