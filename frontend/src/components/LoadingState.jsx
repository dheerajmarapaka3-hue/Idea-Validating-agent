import React, { useState, useEffect } from 'react';
import { Search, Globe, ShieldAlert, Cpu, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

const STAGES = [
  {
    id: 'agent',
    title: 'Initializing Antigravity Agent',
    description: 'Configuring Gemini 2.5 Flash with due-diligence system instructions...',
    icon: Cpu,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20'
  },
  {
    id: 'search',
    title: 'Live Market & Competitor Search',
    description: 'Querying DuckDuckGo for direct competitors, alternatives, and existing SaaS tools...',
    icon: Search,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20'
  },
  {
    id: 'scrape',
    title: 'Crawling Competitor Landing Pages',
    description: 'Dispatching Crawl4AI AsyncWebCrawler to extract competitor pricing and feature sets...',
    icon: Globe,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  {
    id: 'analyze',
    title: 'Synthesizing Viability & Fatal Flaws',
    description: 'Evaluating unit economics, fatal assumptions, and assembling lean MVP roadmap...',
    icon: ShieldAlert,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20'
  }
];

export default function LoadingState({ pitch }) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Advance progress stages periodically for rich visual feedback
    const interval = setInterval(() => {
      setCurrentStageIdx((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="loading-state-container" className="w-full max-w-3xl mx-auto py-8">
      <div className="glass-panel-glow rounded-2xl p-6 sm:p-10 border border-indigo-500/30 text-center relative overflow-hidden">
        {/* Radar Background Pulse Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-96 h-96 rounded-full border border-indigo-500 animate-radar" />
          <div className="w-64 h-64 rounded-full border border-purple-500 animate-radar" style={{ animationDelay: '0.8s' }} />
          <div className="w-32 h-32 rounded-full border border-pink-500 animate-radar" style={{ animationDelay: '1.6s' }} />
        </div>

        {/* Central Spinner & Status */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-xl shadow-indigo-500/20 animate-pulse">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono text-indigo-300">
              {secondsElapsed}s
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white tracking-tight">
            Autonomous Due-Diligence Pipeline Active
          </h3>
          <p className="mt-2 text-sm text-slate-400 max-w-lg mx-auto font-mono truncate px-4 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
            "{pitch}"
          </p>

          {/* Stepper HUD */}
          <div className="w-full max-w-xl mt-8 space-y-3 text-left">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isCompleted = idx < currentStageIdx;
              const isCurrent = idx === currentStageIdx;
              const isUpcoming = idx > currentStageIdx;

              return (
                <div
                  key={stage.id}
                  className={`p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-3.5 ${
                    isCurrent
                      ? 'bg-slate-900/90 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                      : isCompleted
                      ? 'bg-slate-950/40 border-slate-800/80 opacity-80'
                      : 'bg-slate-950/20 border-slate-850 opacity-40'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                      isCompleted
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : isCurrent
                        ? `${stage.bgColor} ${stage.color} border ${stage.borderColor} animate-pulse`
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${isCurrent ? 'text-white' : isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
                        {stage.title}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          In Progress
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[10px] font-mono text-emerald-400">Done</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Multi-agent workflow using live web search and HTML/markdown parsing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
