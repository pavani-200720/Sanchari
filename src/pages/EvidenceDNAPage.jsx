import React from 'react';
import { useCase } from '../context/CaseContext';
import { Fingerprint, Cpu, HardDrive, MapPin, Globe, FileCode, CheckCircle2, ShieldCheck, ArrowRight, BrainCircuit, GitCommitHorizontal } from 'lucide-react';
import CryptographicHashCard from '../components/common/CryptographicHashCard';

export default function EvidenceDNAPage({ setActiveRoute }) {
  const { activeEvidence, setActiveEvidenceId, evidenceList } = useCase();
  const dna = activeEvidence.evidenceDNA;

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-cyan-400" />
            <span>EVIDENCE DNA & FILE FINGERPRINT</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Deep forensic metadata, EXIF streams, device serials, and low-level byte signatures</p>
        </div>

        {/* Evidence Switcher */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-400">Select Item:</span>
          <select 
            value={activeEvidence.id} 
            onChange={(e) => setActiveEvidenceId(e.target.value)}
            className="bg-cyber-950 border border-slate-700 rounded px-3 py-1.5 text-slate-100 font-mono"
          >
            {evidenceList.map(e => (
              <option key={e.id} value={e.id}>{e.id} - {e.fileName}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CryptographicHashCard 
            hash={activeEvidence.sha256Hash} 
            status={activeEvidence.integrityStatus}
          />

          <div className="cyber-card space-y-4">
            <h3 className="font-mono font-bold text-sm text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>FORENSIC DNA SPECIFICATION & DIGITAL FINGERPRINT</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-cyber-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Evidence ID / Version:</span>
                <span className="text-cyan-300 font-bold text-sm">{activeEvidence.id} (v1.0 Genesis)</span>
              </div>
              <div className="bg-cyber-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Associated Case Docket:</span>
                <span className="text-emerald-400 font-bold text-sm">{activeEvidence.caseId}</span>
              </div>
              <div className="bg-cyber-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Digital Signature Sign-off:</span>
                <span className="text-purple-300 font-semibold">SIG-PKI-SHARMA-99120 (VALID)</span>
              </div>
              <div className="bg-cyber-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Seizer / Owner:</span>
                <span className="text-slate-200 font-semibold">{activeEvidence.seizedBy}</span>
              </div>
              <div className="bg-cyber-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">EXIF / Software Origin:</span>
                <span className="text-slate-200">{dna.exifSoftware}</span>
              </div>
              <div className="bg-cyber-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Hardware MAC / Serial:</span>
                <span className="text-slate-200">{dna.deviceFingerprint}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header HEX & Workflow Links */}
        <div className="space-y-6">
          <div className="cyber-card space-y-4">
            <h3 className="font-mono font-bold text-sm text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span>HEADER HEX SIGNATURE</span>
            </h3>
            <div className="bg-cyber-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-purple-300 break-all">
              {dna.fileHeaderHex}
            </div>
            <div className="text-xs text-slate-400 font-mono space-y-1.5">
              <div><strong className="text-slate-300">MIME Type:</strong> {dna.mimeSignature}</div>
              <div><strong className="text-slate-300">Created:</strong> {dna.creationTimestamp}</div>
              <div><strong className="text-slate-300">Location:</strong> {dna.geoTag}</div>
            </div>
          </div>

          <div className="cyber-card space-y-3">
            <h3 className="font-mono font-bold text-xs text-slate-300 uppercase tracking-wider">NEXT WORKFLOW STAGE</h3>
            <button
              onClick={() => setActiveRoute('ai-analysis')}
              className="w-full py-2.5 bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-300 font-mono text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-cyber-glow"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Proceed to AI Evidence Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
