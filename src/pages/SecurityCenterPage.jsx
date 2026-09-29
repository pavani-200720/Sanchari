import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Key, UserCheck, Lock, Cpu, ShieldCheck, RefreshCw, AlertTriangle } from 'lucide-react';

export default function SecurityCenterPage() {
  const { currentRole, checkPermission } = useAuth();
  const [keyRotated, setKeyRotated] = useState(false);

  const handleRotateKeys = () => {
    if (!checkPermission('ROTATE_KEYS')) return;
    setKeyRotated(true);
    setTimeout(() => setKeyRotated(false), 3000);
  };

  const rbacMatrix = [
    { role: 'Investigating Officer (IO)', viewEvidence: 'YES', editMetadata: 'NO', exportCourt: 'YES', verifyHash: 'YES' },
    { role: 'Forensic Analyst', viewEvidence: 'YES', editMetadata: 'YES (Lab Notes)', exportCourt: 'NO', verifyHash: 'YES' },
    { role: 'Public Prosecutor', viewEvidence: 'YES (Read-only)', editMetadata: 'NO', exportCourt: 'YES (Watermarked)', verifyHash: 'YES' },
    { role: 'System Admin', viewEvidence: 'AUDIT_LOGS_ONLY', editMetadata: 'NO', exportCourt: 'NO', verifyHash: 'YES' }
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>SECURITY CENTER & THREAT MONITOR</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Granular security policies, PKI key rotation, encryption status, and session access enforcement</p>
        </div>

        <button 
          onClick={handleRotateKeys}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-semibold rounded-lg flex items-center gap-2 shadow-cyber-glow transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Rotate PKI Master Keys</span>
        </button>
      </div>

      {keyRotated && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500 text-emerald-300 font-mono text-xs rounded-lg flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>PKI Master Encryption Keys Rotated Successfully! Genesis Block updated.</span>
        </div>
      )}

      {/* Security Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="cyber-card-glow border-l-4 border-l-emerald-500">
          <div className="text-xs font-mono text-slate-400">Vault Encryption</div>
          <div className="text-lg font-mono font-bold text-emerald-400 mt-1">AES-256 GCM</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">Hardware Security Module (HSM)</div>
        </div>

        <div className="cyber-card-glow border-l-4 border-l-cyan-500">
          <div className="text-xs font-mono text-slate-400">Auth Status</div>
          <div className="text-lg font-mono font-bold text-cyan-400 mt-1">PKI 2FA ACTIVE</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">X.509 Certificate Token</div>
        </div>

        <div className="cyber-card-glow border-l-4 border-l-purple-500">
          <div className="text-xs font-mono text-slate-400">Integrity Telemetry</div>
          <div className="text-lg font-mono font-bold text-purple-400 mt-1">100% AUDITED</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">Genesis Blockchain Verifier</div>
        </div>

        <div className="cyber-card-alert border-l-4 border-l-red-500">
          <div className="text-xs font-mono text-slate-400">Suspicious Events</div>
          <div className="text-lg font-mono font-bold text-red-400 mt-1">1 Tamper Alert</div>
          <div className="text-[10px] text-red-300 font-mono mt-1">185.220.101.5 Quarantined</div>
        </div>
      </div>

      {/* RBAC Matrix */}
      <div className="cyber-card space-y-4">
        <h3 className="font-mono font-bold text-sm text-slate-200 border-b border-slate-800 pb-3">
          OPERATIONAL ROLE PERMISSIONS MATRIX
        </h3>
        <div className="overflow-x-auto">
          <table className="cyber-table">
            <thead>
              <tr>
                <th>Role / Persona</th>
                <th>View Evidence</th>
                <th>Edit Metadata</th>
                <th>Export Court Bundle</th>
                <th>Verify Hash</th>
              </tr>
            </thead>
            <tbody>
              {rbacMatrix.map((item, idx) => (
                <tr key={idx}>
                  <td className="font-bold text-slate-200">{item.role}</td>
                  <td className="font-mono text-cyan-300">{item.viewEvidence}</td>
                  <td className="font-mono text-slate-400">{item.editMetadata}</td>
                  <td className="font-mono text-emerald-400">{item.exportCourt}</td>
                  <td className="font-mono text-purple-400">{item.verifyHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
