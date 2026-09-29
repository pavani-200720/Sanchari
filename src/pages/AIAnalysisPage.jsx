import React from 'react';
import { useCase } from '../context/CaseContext';
import { BrainCircuit, AlertTriangle, ShieldCheck, Building2, Globe, Hash, ArrowRight, GitCommitHorizontal } from 'lucide-react';
import DisclaimerNotice from '../components/common/DisclaimerNotice';

export default function AIAnalysisPage({ setActiveRoute }) {
  const { activeEvidence } = useCase();
  const ai = activeEvidence.aiAnalysis;

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-purple-400" />
          <span>AI EVIDENCE INTELLIGENCE & ENTITY SCANNER</span>
        </h2>
        <p className="text-xs text-slate-400 font-mono mt-1">NLP entity extraction, sentiment anomaly scoring, and automated forensic synthesis</p>
      </div>

      <DisclaimerNotice />

      {/* Main Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="cyber-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-mono font-bold text-sm text-slate-200">INTELLIGENCE SYNTHESIS REPORT</h3>
              <div className="flex items-center gap-2">
                <span className="cyber-badge cyber-badge-cyan">AI CONFIDENCE: {ai.confidenceScore}%</span>
                <span className={`cyber-badge ${ai.riskLevel === 'CRITICAL' ? 'cyber-badge-crimson' : 'cyber-badge-amber'}`}>
                  RISK: {ai.riskLevel}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">{ai.summary}</p>
          </div>

          <div className="cyber-card space-y-4">
            <h3 className="font-mono font-bold text-sm text-slate-200 border-b border-slate-800 pb-3">EXTRACTED KEY ENTITIES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ai.extractedEntities.map((ent, idx) => (
                <div key={idx} className="bg-cyber-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 block">{ent.type}</span>
                    <span className="font-semibold text-xs text-slate-100">{ent.text}</span>
                  </div>
                  <span className={`cyber-badge ${ent.risk === 'CRITICAL' ? 'cyber-badge-crimson' : 'cyber-badge-amber'}`}>
                    {ent.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Anomaly Alerts & Next Stage Link */}
        <div className="space-y-6">
          <div className="cyber-card-alert space-y-4">
            <h3 className="font-mono font-bold text-sm text-red-300 border-b border-red-900/60 pb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
              <span>MANIPULATION INDICATORS & ANOMALIES</span>
            </h3>
            <ul className="space-y-2 text-xs font-mono text-red-200">
              {ai.anomalies.map((anom, idx) => (
                <li key={idx} className="bg-red-950/40 p-2.5 rounded border border-red-900/60 flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>{anom}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cyber-card space-y-3">
            <h3 className="font-mono font-bold text-xs text-slate-300 uppercase tracking-wider">NEXT WORKFLOW STAGE</h3>
            <button
              onClick={() => setActiveRoute('chain-of-custody')}
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-cyber-glow"
            >
              <GitCommitHorizontal className="w-4 h-4" />
              <span>Inspect Chain of Custody</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
