import React, { useState } from 'react';
import { useCase } from '../context/CaseContext';
import { History, Play, Pause, AlertTriangle, ShieldCheck, RefreshCw, Network, ArrowRight, Layers } from 'lucide-react';
import SecurityBanner from '../components/common/SecurityBanner';

export default function TamperReplayPage({ setActiveRoute }) {
  const { activeEvidence, toggleTamperSimulation } = useCase();
  const tamper = activeEvidence.tamperState;

  const [activeVersion, setActiveVersion] = useState(tamper.isTampered ? 'v2' : 'v1');

  const versions = [
    {
      id: 'v1',
      label: 'Version 1.0 (Genesis Seizure)',
      timestamp: '2026-08-14 10:15:00 UTC',
      user: 'Sub-Ins. P. Sharma (Seizing Officer)',
      hash: tamper.originalHash,
      status: 'PRISTINE_GENESIS',
      transferAmount: '$2,400,000 USD',
      beneficiary: 'Apex Overseas Holdings Ltd',
      modifiedField: null
    },
    {
      id: 'v2',
      label: 'Version 2.0 (Unauthorized Remote Mutation)',
      timestamp: '2026-08-16 03:12:00 UTC',
      user: 'UNKNOWN_ACTOR (185.220.101.5)',
      hash: tamper.modifiedHash,
      status: 'TAMPER_ALERT',
      transferAmount: '$240,000 USD',
      beneficiary: 'Shell Corp Asia Pacific',
      modifiedField: 'Line 42: Amount altered from $2.4M to $240K & Beneficiary Changed'
    },
    {
      id: 'v3',
      label: 'Version 3.0 (Blockchain Ledger Recovery)',
      timestamp: '2026-08-16 09:30:00 UTC',
      user: 'Dr. Ananya Roy (Forensic Analyst)',
      hash: tamper.originalHash,
      status: 'RESTORED_BY_LEDGER',
      transferAmount: '$2,400,000 USD',
      beneficiary: 'Apex Overseas Holdings Ltd',
      modifiedField: 'Restored from Genesis Block #40912'
    }
  ];

  const currentV = versions.find(v => v.id === activeVersion) || versions[0];
  const genesisV = versions[0];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
            <History className="w-5 h-5 text-red-400" />
            <span>FORENSIC TAMPER REPLAY SIMULATOR</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Interactive multi-version playback scrub showing pristine vs tampered document states</p>
        </div>

        <button
          onClick={() => toggleTamperSimulation(activeEvidence.id)}
          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300 flex items-center gap-2 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Toggle Tamper State</span>
        </button>
      </div>

      {currentV.status === 'TAMPER_ALERT' ? (
        <SecurityBanner 
          type="danger"
          title="CRITICAL HASH MUTATION ALERT DETECTED"
          message={`Version 2.0 contains 2 altered fields. Hash mismatch against genesis block.`}
        />
      ) : (
        <SecurityBanner 
          type="success"
          title="FILE INTEGRITY MATCHES GENESIS BLOCK"
          message="100% byte-for-byte match against original seizure disk image."
        />
      )}

      {/* Version Selector Tabs */}
      <div className="cyber-card space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-mono font-bold text-xs text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>HISTORICAL VERSION TIMELINE SCRUBBER</span>
          </span>
          <span className="cyber-badge cyber-badge-cyan font-mono">
            CURRENTLY SCRUBBING: {currentV.id.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {versions.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVersion(v.id)}
              className={`p-3.5 rounded-xl border font-mono text-xs text-left transition-all ${
                activeVersion === v.id
                  ? v.status === 'TAMPER_ALERT'
                    ? 'bg-red-950/80 border-red-500 text-red-200 shadow-alert-glow'
                    : 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-cyber-glow'
                  : 'bg-cyber-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>{v.label}</span>
                {v.status === 'TAMPER_ALERT' && <AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">{v.timestamp}</div>
            </button>
          ))}
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-cyber-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-emerald-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>GENESIS SEIZURE STATE (v1.0)</span>
            </h4>
            <div className="space-y-2 text-slate-300">
              <div><span className="text-slate-500">Timestamp:</span> {genesisV.timestamp}</div>
              <div><span className="text-slate-500">Custodian:</span> {genesisV.user}</div>
              <div className="bg-slate-900 p-2 rounded text-[11px] truncate"><strong className="text-slate-400">SHA-256:</strong> {genesisV.hash}</div>
              <div className="bg-slate-900 p-3 rounded border border-emerald-500/30 text-emerald-300 font-semibold space-y-1 mt-2">
                <div>Transfer Amount: {genesisV.transferAmount}</div>
                <div>Beneficiary: {genesisV.beneficiary}</div>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border space-y-3 ${
            currentV.status === 'TAMPER_ALERT' ? 'bg-red-950/20 border-red-800/80' : 'bg-cyber-950 border-slate-800'
          }`}>
            <h4 className="font-bold text-cyan-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <History className="w-4 h-4 text-cyan-400" />
              <span>ACTIVE SCRUBBED STATE ({currentV.id.toUpperCase()})</span>
            </h4>
            <div className="space-y-2 text-slate-300">
              <div><span className="text-slate-500">Timestamp:</span> {currentV.timestamp}</div>
              <div><span className="text-slate-500">Actor:</span> {currentV.user}</div>
              <div className="bg-slate-900 p-2 rounded text-[11px] truncate"><strong className="text-slate-400">SHA-256:</strong> {currentV.hash}</div>
              <div className={`p-3 rounded border font-semibold space-y-1 mt-2 ${
                currentV.status === 'TAMPER_ALERT' 
                  ? 'bg-red-950/60 border-red-500 text-red-300' 
                  : 'bg-slate-900 border-slate-700 text-slate-200'
              }`}>
                <div>Transfer Amount: {currentV.transferAmount}</div>
                <div>Beneficiary: {currentV.beneficiary}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Workflow Stage */}
      <div className="cyber-card space-y-3">
        <h3 className="font-mono font-bold text-xs text-slate-300 uppercase tracking-wider">NEXT WORKFLOW STAGE</h3>
        <button
          onClick={() => setActiveRoute('relationship-graph')}
          className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-cyber-glow"
        >
          <Network className="w-4 h-4" />
          <span>Launch Evidence Relationship Graph</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
