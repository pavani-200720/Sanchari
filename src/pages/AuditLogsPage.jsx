import React, { useState } from 'react';
import { useCase } from '../context/CaseContext';
import { ScrollText, Search, ShieldAlert, CheckCircle2, ArrowRight, Share2 } from 'lucide-react';

export default function AuditLogsPage({ setActiveRoute }) {
  const { auditLogs } = useCase();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    return log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
           log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
           log.targetResource.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-cyan-400" />
            <span>IMMUTABLE SYSTEM AUDIT LOGS</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Cryptographically signed access records for court admissibility auditing</p>
        </div>

        <div className="flex items-center gap-2 bg-cyber-950 px-3 py-1.5 rounded-lg border border-slate-700 max-w-xs">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Filter logs by User, Action, Resource..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none text-xs text-slate-100 focus:outline-none w-full font-mono"
          />
        </div>
      </div>

      <div className="cyber-card space-y-4">
        <div className="overflow-x-auto">
          <table className="cyber-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Timestamp (UTC)</th>
                <th>User / Persona</th>
                <th>Role</th>
                <th>IP Address</th>
                <th>Action</th>
                <th>Target Resource</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="font-mono text-cyan-400 font-semibold">{log.id}</td>
                  <td className="font-mono text-xs">{log.timestamp}</td>
                  <td className="font-semibold text-slate-200">{log.user}</td>
                  <td className="font-mono text-xs text-slate-400">{log.userRole}</td>
                  <td className="font-mono text-xs text-slate-400">{log.ipAddress}</td>
                  <td className="font-mono text-xs text-cyan-300">{log.action}</td>
                  <td className="font-mono text-xs">{log.targetResource}</td>
                  <td>
                    <span className={`cyber-badge ${
                      log.result.includes('BLOCKED') ? 'cyber-badge-crimson' : 'cyber-badge-emerald'
                    }`}>
                      {log.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Next Workflow Stage */}
      <div className="cyber-card space-y-3">
        <h3 className="font-mono font-bold text-xs text-slate-300 uppercase tracking-wider">NEXT WORKFLOW STAGE</h3>
        <button
          onClick={() => setActiveRoute('secure-sharing')}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-emerald-glow"
        >
          <Share2 className="w-4 h-4" />
          <span>Proceed to Secure Judicial Sharing</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
