import React, { useState } from 'react';
import { useCase } from '../context/CaseContext';
import { useAuth } from '../context/AuthContext';
import { FileCheck2, Fingerprint, BrainCircuit, History, Search, Filter, Upload, LayoutGrid, List } from 'lucide-react';
import CryptographicHashCard from '../components/common/CryptographicHashCard';

export default function EvidenceRepositoryPage({ setActiveRoute, onOpenUploadModal }) {
  const { evidenceList, setActiveEvidenceId } = useCase();
  const { checkPermission } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const filteredEvidence = evidenceList.filter(evi => {
    const matchesSearch = evi.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          evi.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          evi.sha256Hash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || evi.integrityStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-cyan-400" />
            <span>DIGITAL EVIDENCE & DOCUMENT REPOSITORY</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Centralized vault of seized digital artifacts with SHA-256 genesis hashes</p>
        </div>
        <button 
          onClick={() => checkPermission('UPLOAD_EVIDENCE', onOpenUploadModal)}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold rounded-lg flex items-center gap-2 shadow-cyber-glow transition-all"
        >
          <Upload className="w-4 h-4" />
          <span>Upload & Ingest Evidence</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="cyber-card flex flex-wrap items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-2 flex-1 max-w-md bg-cyber-950 px-3 py-2 rounded-lg border border-slate-700">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search Evidence ID, File Name, or Hash..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none text-xs text-slate-100 focus:outline-none w-full font-mono"
          />
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Status Filter:</span>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-cyber-950 border border-slate-700 rounded px-2.5 py-1 text-slate-100"
            >
              <option value="ALL">All Statuses</option>
              <option value="VERIFIED">Verified Only</option>
              <option value="TAMPER_DETECTED">Tamper Alerts Only</option>
            </select>
          </div>

          <div className="flex items-center border border-slate-700 rounded-lg p-0.5 bg-cyber-950">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or Table Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvidence.map((evi) => {
            const isTampered = evi.integrityStatus === 'TAMPER_DETECTED';
            return (
              <div 
                key={evi.id} 
                className={`cyber-card space-y-4 ${
                  isTampered ? 'border-red-800/60 bg-red-950/20' : 'hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-mono text-xs font-bold text-cyan-400">{evi.id}</span>
                  <span className={`cyber-badge ${isTampered ? 'cyber-badge-crimson' : 'cyber-badge-emerald'}`}>
                    {isTampered ? 'TAMPER ALERT' : 'VERIFIED'}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-100 font-mono break-all">{evi.fileName}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">{evi.category} • {evi.fileSize}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Seized: {evi.seizureDate}</p>
                </div>

                <CryptographicHashCard 
                  hash={evi.sha256Hash} 
                  status={evi.integrityStatus}
                />

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <button
                    onClick={() => {
                      setActiveEvidenceId(evi.id);
                      setActiveRoute('evidence-dna');
                    }}
                    className="bg-slate-800 hover:bg-cyan-950 hover:border-cyan-500/40 border border-slate-700 text-cyan-300 font-mono text-xs py-2 rounded-lg flex items-center justify-center gap-1 transition-all"
                  >
                    <Fingerprint className="w-3.5 h-3.5" />
                    <span>DNA</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveEvidenceId(evi.id);
                      setActiveRoute('ai-analysis');
                    }}
                    className="bg-slate-800 hover:bg-purple-950 hover:border-purple-500/40 border border-slate-700 text-purple-300 font-mono text-xs py-2 rounded-lg flex items-center justify-center gap-1 transition-all"
                  >
                    <BrainCircuit className="w-3.5 h-3.5" />
                    <span>AI</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveEvidenceId(evi.id);
                      setActiveRoute('tamper-replay');
                    }}
                    className="bg-slate-800 hover:bg-red-950 hover:border-red-500/40 border border-slate-700 text-red-300 font-mono text-xs py-2 rounded-lg flex items-center justify-center gap-1 transition-all"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>Diff</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="cyber-card">
          <table className="cyber-table">
            <thead>
              <tr>
                <th>Evidence ID</th>
                <th>File Name</th>
                <th>Category</th>
                <th>Case ID</th>
                <th>SHA-256 Hash</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvidence.map((evi) => (
                <tr key={evi.id}>
                  <td className="font-mono text-cyan-400 font-bold">{evi.id}</td>
                  <td className="font-bold text-slate-200">{evi.fileName}</td>
                  <td className="font-mono text-xs">{evi.category}</td>
                  <td className="font-mono text-xs text-slate-400">{evi.caseId}</td>
                  <td className="font-mono text-xs text-slate-400 max-w-xs truncate">{evi.sha256Hash}</td>
                  <td>
                    <span className={`cyber-badge ${evi.integrityStatus === 'TAMPER_DETECTED' ? 'cyber-badge-crimson' : 'cyber-badge-emerald'}`}>
                      {evi.integrityStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setActiveEvidenceId(evi.id);
                        setActiveRoute('evidence-dna');
                      }}
                      className="text-cyan-400 font-mono text-xs underline hover:text-cyan-300"
                    >
                      View DNA
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
