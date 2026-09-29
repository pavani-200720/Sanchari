import React, { useState } from 'react';
import { useCase } from '../context/CaseContext';
import { useAuth } from '../context/AuthContext';
import { GitCommitHorizontal, AlertTriangle, CheckCircle2, User, ShieldCheck, Plus, ArrowRight, History } from 'lucide-react';
import SecurityBanner from '../components/common/SecurityBanner';

export default function ChainOfCustodyPage({ setActiveRoute }) {
  const { activeEvidence, custodyLogs } = useCase();
  const { currentRole, checkPermission } = useAuth();

  const [showTransferModal, setShowTransferModal] = useState(false);
  const [recipient, setRecipient] = useState("Adv. V. Swaminathan (Special Prosecutor)");
  const [notes, setNotes] = useState("Handover for Court Disclosure & Evidence Verification");

  const evidenceLogs = custodyLogs.filter(l => l.evidenceId === activeEvidence.id);
  const hasCustodyGap = evidenceLogs.some(l => l.verifiedStatus === 'HASH_MISMATCH');

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
            <GitCommitHorizontal className="w-5 h-5 text-cyan-400" />
            <span>CHAIN-OF-CUSTODY & GAP DETECTOR</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Immutable chronological timeline of evidence handovers, digital signatures, and anomaly alerts</p>
        </div>

        <button
          onClick={() => checkPermission('TRANSFER_CUSTODY', () => setShowTransferModal(true))}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold rounded-lg flex items-center gap-2 shadow-cyber-glow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Record Custody Handover</span>
        </button>
      </div>

      {hasCustodyGap ? (
        <SecurityBanner 
          type="danger"
          title="CRITICAL CUSTODY GAP DETECTED!"
          message="Automated Gap Analysis Engine flagged Step #3: File hash mismatch detected during unauthorized remote stream access window."
        />
      ) : (
        <SecurityBanner 
          type="success"
          title="CHAIN-OF-CUSTODY AUDIT VERIFIED"
          message="100% of digital sign-offs matched with Genesis Blockchain hashes. No unauthorized access gaps."
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 cyber-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-mono font-bold text-sm text-slate-200">
              HANDOVER TIMELINE FOR: <span className="text-cyan-400">{activeEvidence.fileName}</span>
            </h3>
            <span className="cyber-badge cyber-badge-cyan font-mono">{evidenceLogs.length} LOGGED STEPS</span>
          </div>

          <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {evidenceLogs.map((log) => {
              const isAnomaly = log.verifiedStatus === 'HASH_MISMATCH';
              return (
                <div key={log.id} className="relative group">
                  <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold ${
                    isAnomaly 
                      ? 'bg-red-950 border-red-500 text-red-400 animate-pulse' 
                      : 'bg-cyber-900 border-cyan-500 text-cyan-400'
                  }`}>
                    {log.stepNumber}
                  </div>

                  <div className={`p-4 rounded-xl border space-y-2 ${
                    isAnomaly ? 'bg-red-950/30 border-red-800/80' : 'bg-cyber-950 border-slate-800'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                      <span className="font-mono font-bold text-xs text-slate-100">{log.action}</span>
                      <span className={`cyber-badge ${isAnomaly ? 'cyber-badge-crimson' : 'cyber-badge-emerald'}`}>
                        {log.verifiedStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-mono text-slate-400">
                      <div><strong>Actor:</strong> {log.actor} ({log.role})</div>
                      <div><strong>Agency:</strong> {log.agency}</div>
                      <div><strong>Timestamp:</strong> {log.timestamp}</div>
                    </div>

                    <div className="bg-slate-900/60 p-2 rounded text-[11px] font-mono text-slate-300">
                      <strong className="text-slate-400">SHA-256 Hash at Transfer:</strong> {log.hashAtTransfer}
                    </div>

                    <p className="text-xs text-slate-300 font-sans pt-1">{log.notes}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workflow Navigation */}
        <div className="space-y-6">
          <div className="cyber-card space-y-3">
            <h3 className="font-mono font-bold text-xs text-slate-300 uppercase tracking-wider">NEXT WORKFLOW STAGE</h3>
            <button
              onClick={() => setActiveRoute('tamper-replay')}
              className="w-full py-2.5 bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-300 font-mono text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-alert-glow"
            >
              <History className="w-4 h-4" />
              <span>Launch Tamper Replay Diff</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
