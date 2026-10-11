import React, { useState } from 'react';
import { Sparkles, Shield, AlertCircle, RefreshCw, Terminal } from 'lucide-react';
import PitchInput from './components/PitchInput';
import LoadingState from './components/LoadingState';
import ReportDashboard from './components/ReportDashboard';

export default function App() {
  const [activePitch, setActivePitch] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const handleValidate = async (pitch) => {
    setActivePitch(pitch);
    setIsLoading(true);
    setError(null);

    try {
      // Send request to FastAPI backend
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pitch,
          api_key: apiKey ? apiKey.trim() : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server returned error status ${response.status}`);
      }

      const data = await response.json();
      setReport(data);
    } catch (err) {
      console.error('Validation request failed:', err);
      setError(err.message || 'Failed to complete autonomous validation. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Validate<span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">AI</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Multi-Agent Live</span>
            </div>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline font-mono">Antigravity SDK</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-center">
        {/* Error Alert */}
        {error && (
          <div className="max-w-3xl mx-auto w-full mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 flex items-start justify-between gap-3 animate-fadeIn">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-rose-300">Validation Error</h4>
                <p className="text-xs text-rose-200/90 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs text-rose-400 hover:text-rose-200 underline shrink-0 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* State Switching */}
        {isLoading ? (
          <LoadingState pitch={activePitch} />
        ) : report ? (
          <ReportDashboard report={report} onReset={handleReset} />
        ) : (
          <PitchInput
            onValidate={handleValidate}
            isLoading={isLoading}
            apiKey={apiKey}
            setApiKey={setApiKey}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Autonomous Startup Due Diligence • Antigravity Agent + Crawl4AI + DuckDuckGo</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>FastAPI + Uvicorn</span>
            <span>•</span>
            <span>React + Vite + Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
