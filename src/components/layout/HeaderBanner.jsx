import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, AlertTriangle, Cpu } from 'lucide-react';

export default function HeaderBanner() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyber-950 via-slate-900 to-cyber-950 border-b border-cyan-500/20 px-6 py-2 flex flex-wrap items-center justify-between text-xs text-slate-300 shadow-sm relative z-30">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-cyan-950/60 text-cyan-400 px-2.5 py-1 rounded border border-cyan-500/30 font-mono font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>GOVT OF INDIA // SIH 2026 PROTOTYPE</span>
        </div>
        <span className="hidden md:inline text-slate-500">|</span>
        <div className="hidden md:flex items-center gap-1.5 text-slate-400">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span className="font-mono text-emerald-400">CLEARANCE: TOP SECRET / LAW ENFORCEMENT ONLY</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Prototype Disclaimer Banner */}
        <div className="flex items-center gap-1.5 bg-amber-950/40 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded text-[11px] font-mono">
          <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
          <span>SIMULATED PROTOTYPE ANALYSIS</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 font-mono text-slate-400">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>{time || '2026-09-28 22:45:00 UTC'}</span>
        </div>
      </div>
    </div>
  );
}
