import React, { useState } from 'react';
import { Fingerprint, CheckCircle2, AlertTriangle, Copy, ShieldCheck, RefreshCw } from 'lucide-react';

export default function CryptographicHashCard({ hash, algorithm = "SHA-256", status = "VERIFIED", onVerify }) {
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      if (onVerify) onVerify();
    }, 600);
  };

  const isTampered = status === "TAMPER_DETECTED";

  return (
    <div className={`p-4 rounded-xl border transition-all ${
      isTampered 
        ? 'bg-red-950/20 border-red-800/60 text-red-200' 
        : 'bg-cyber-900/90 border-slate-800 text-slate-200'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Fingerprint className={`w-4 h-4 ${isTampered ? 'text-red-400' : 'text-cyan-400'}`} />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-300">{algorithm} GENESIS FINGERPRINT</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`cyber-badge ${
            isTampered ? 'cyber-badge-crimson' : 'cyber-badge-emerald'
          }`}>
            {isTampered ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
            <span>{isTampered ? 'TAMPER DETECTED' : 'INTEGRITY VERIFIED'}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-cyber-950/80 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 break-all group">
        <span className="select-all font-mono">{hash}</span>
        <button 
          onClick={handleCopy} 
          className="ml-2 p-1 text-slate-400 hover:text-cyan-400 shrink-0 transition-colors"
          title="Copy Hash"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Verified against Genesis Blockchain Ledger</span>
        <button 
          onClick={handleVerify}
          disabled={verifying}
          className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${verifying ? 'animate-spin' : ''}`} />
          <span>{verifying ? 'Scanning...' : 'Re-verify Hash'}</span>
        </button>
      </div>
    </div>
  );
}
