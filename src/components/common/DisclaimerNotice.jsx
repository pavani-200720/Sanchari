import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DisclaimerNotice() {
  return (
    <div className="bg-amber-950/20 border border-amber-800/40 rounded-lg p-3 text-[11px] font-mono text-amber-300 flex items-center gap-2">
      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
      <div>
        <strong className="text-amber-200">SIH 2026 Evaluation Notice:</strong> AI forensic analysis, tamper replay diffs, and blockchain verification blocks are simulated with high fidelity for prototype demonstration.
      </div>
    </div>
  );
}
