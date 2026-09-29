import React, { useState } from 'react';
import { useCase } from '../context/CaseContext';
import { FolderLock, Shield, FileCheck2, ArrowRight, User, Calendar, AlertTriangle, GitCommitHorizontal, Clock } from 'lucide-react';

export default function CasesPage({ setActiveRoute }) {
  const { cases, setActiveCaseId, evidenceList } = useCase();
  const [selectedCaseForTimeline, setSelectedCaseForTimeline] = useState(null);

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
            <FolderLock className="w-5 h-5 text-cyan-400" />
            <span>CASE MANAGEMENT & INVESTIGATION DOCKETS</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Law-enforcement & legal investigation records under active surveillance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cases.map((c) => {
          const caseEvidence = evidenceList.filter(e => e.caseId === c.id);
          const hasTampered = caseEvidence.some(e => e.integrityStatus === 'TAMPER_DETECTED');

          return (
            <div key={c.id} className="cyber-card-glow space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-mono text-sm font-bold text-cyan-400">{c.id}</span>
                <div className="flex items-center gap-2">
                  <span className="cyber-badge cyber-badge-crimson">{c.classification}</span>
                  {hasTampered && <span className="cyber-badge cyber-badge-amber">ALERT</span>}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-100">{c.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">{c.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-cyber-950 p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Lead Officer:</span>
                  <span className="text-slate-200 font-semibold">{c.leadOfficer}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Legal Officer / Prosecutor:</span>
                  <span className="text-purple-300 font-semibold">{c.prosecutor}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Forensic Analyst:</span>
                  <span className="text-cyan-300 font-semibold">{c.analyst}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Evidence Registered:</span>
                  <span className="text-cyan-400 font-bold">{c.evidenceCount} Files</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setActiveCaseId(c.id);
                    setActiveRoute('repository');
                  }}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-cyber-glow"
                >
                  <span>Explore Repository</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setSelectedCaseForTimeline(c)}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-mono text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Case Timeline</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Timeline Modal */}
      {selectedCaseForTimeline && (
        <div className="fixed inset-0 bg-cyber-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-cyber-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 font-mono text-xs text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-slate-200 text-sm">{selectedCaseForTimeline.id} CHRONOLOGICAL TIMELINE</span>
              <button onClick={() => setSelectedCaseForTimeline(null)} className="text-slate-400 hover:text-slate-100 font-bold">X</button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1"></div>
                <div>
                  <div className="font-bold text-slate-200">2026-08-14 09:30 UTC - Case Docket Opened</div>
                  <div className="text-slate-400 text-[11px] font-sans">Seizure warrant issued under Court Reference {selectedCaseForTimeline.courtReference}</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1"></div>
                <div>
                  <div className="font-bold text-slate-200">2026-08-14 11:00 UTC - Initial Evidence Genesis Ingestion</div>
                  <div className="text-slate-400 text-[11px] font-sans">Primary disk images and PCAP logs registered with SHA-256 genesis hashes</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 mt-1"></div>
                <div>
                  <div className="font-bold text-slate-200">2026-08-18 16:00 UTC - Court Disclosure Export</div>
                  <div className="text-slate-400 text-[11px] font-sans">Prosecutor Adv. V. Swaminathan generated watermarked judicial review links</div>
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedCaseForTimeline(null)} className="w-full py-2 bg-slate-800 text-slate-300 rounded-lg">Close Timeline</button>
          </div>
        </div>
      )}
    </div>
  );
}
