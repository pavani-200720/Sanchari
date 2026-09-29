import React from 'react';
import { useCase } from '../context/CaseContext';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  FolderLock, 
  FileCheck2, 
  AlertTriangle, 
  Fingerprint, 
  Blocks, 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  HardDrive,
  CheckCircle2,
  FilePlus
} from 'lucide-react';
import DisclaimerNotice from '../components/common/DisclaimerNotice';

export default function DashboardPage({ setActiveRoute, onOpenUploadModal }) {
  const { cases, evidenceList, custodyLogs, auditLogs } = useCase();
  const { currentRole, checkPermission } = useAuth();

  const tamperedCount = evidenceList.filter(e => e.integrityStatus === 'TAMPER_DETECTED').length;
  const verifiedCount = evidenceList.filter(e => e.integrityStatus === 'VERIFIED').length;

  return (
    <div className="space-y-6 text-left">
      {/* Page Title & Operational Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>INVESTIGATION COMMAND CENTER DASHBOARD</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Real-time digital evidence surveillance, chain-of-custody tracking & threat telemetry</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => checkPermission('UPLOAD_EVIDENCE', onOpenUploadModal)} 
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-mono font-semibold flex items-center gap-2 transition-colors shadow-cyber-glow"
          >
            <FilePlus className="w-4 h-4" />
            <span>Execute Ingestion Workflow</span>
          </button>
        </div>
      </div>

      <DisclaimerNotice />

      {/* Top Telemetry Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="cyber-card-glow border-l-4 border-l-cyan-500 cursor-pointer" onClick={() => setActiveRoute('cases')}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Active Cases</span>
            <FolderLock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-slate-100">{cases.length}</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">3 Active Dockets</div>
        </div>

        <div className="cyber-card-glow border-l-4 border-l-emerald-500 cursor-pointer" onClick={() => setActiveRoute('repository')}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Verified Items</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-emerald-400">{verifiedCount}</div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1">100% SHA-256 Match</div>
        </div>

        <div className="cyber-card-alert border-l-4 border-l-red-500 cursor-pointer" onClick={() => setActiveRoute('tamper-replay')}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Tamper Alerts</span>
            <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-red-400">{tamperedCount}</div>
          <div className="text-[10px] text-red-300 font-mono mt-1">EVI-2026-88102 Flagged</div>
        </div>

        <div className="cyber-card-glow border-l-4 border-l-purple-500 cursor-pointer" onClick={() => setActiveRoute('blockchain-ledger')}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Ledger Blocks</span>
            <Blocks className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-slate-100">40,915</div>
          <div className="text-[10px] text-purple-300 font-mono mt-1">Genesis Validated</div>
        </div>

        <div className="cyber-card-glow border-l-4 border-l-amber-500 cursor-pointer" onClick={() => setActiveRoute('security-center')}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Security Health</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-amber-400">98.4%</div>
          <div className="text-[10px] text-amber-300 font-mono mt-1">AES-256 Encrypted</div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Investigation Dockets Table */}
        <div className="lg:col-span-2 cyber-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-mono font-bold text-sm text-slate-200 flex items-center gap-2">
              <FolderLock className="w-4 h-4 text-cyan-400" />
              <span>ACTIVE INVESTIGATION DOCKETS</span>
            </h3>
            <button 
              onClick={() => setActiveRoute('cases')}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>View All Cases</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="cyber-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Title / Category</th>
                  <th>Classification</th>
                  <th>Lead Officer</th>
                  <th>Evidence</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((c) => (
                  <tr key={c.id} className="cursor-pointer hover:bg-slate-800/40" onClick={() => setActiveRoute('cases')}>
                    <td className="font-mono text-cyan-400 font-semibold">{c.id}</td>
                    <td>
                      <div className="font-semibold text-slate-200">{c.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{c.category}</div>
                    </td>
                    <td>
                      <span className="cyber-badge cyber-badge-crimson">{c.classification}</span>
                    </td>
                    <td className="font-mono text-xs">{c.leadOfficer}</td>
                    <td className="font-mono text-center font-bold text-cyan-300">{c.evidenceCount}</td>
                    <td>
                      <span className="cyber-badge cyber-badge-emerald">{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live System Activity Feed */}
        <div className="cyber-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-mono font-bold text-sm text-slate-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>RECENT SYSTEM TELEMETRY</span>
            </h3>
            <button onClick={() => setActiveRoute('audit-logs')} className="text-xs font-mono text-cyan-400 hover:underline">
              Audit Logs
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {auditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="bg-cyber-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold">{log.action}</span>
                  <span className="text-[10px] text-slate-500">{log.timestamp.split(' ')[1]}</span>
                </div>
                <div className="text-slate-300 text-[11px]">{log.user}</div>
                <div className="text-slate-400 text-[10px] truncate">{log.targetResource}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
