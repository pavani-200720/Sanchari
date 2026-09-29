import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, Lock, X } from 'lucide-react';

export default function AccessDeniedModal() {
  const { accessDeniedMessage, clearAccessDenied, currentRole } = useAuth();

  if (!accessDeniedMessage) return null;

  return (
    <div className="fixed inset-0 bg-cyber-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-red-950/40 border-2 border-red-600 rounded-2xl max-w-md w-full p-6 shadow-alert-glow space-y-5 text-left relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-red-900/60 pb-3">
          <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
            <span>ROLE-BASED ACCESS DENIED (RBAC)</span>
          </div>
          <button onClick={clearAccessDenied} className="text-red-400 hover:text-red-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <p className="text-red-200 bg-red-950/80 p-3.5 rounded-lg border border-red-900/80 leading-relaxed">
            {accessDeniedMessage}
          </p>

          <div className="bg-cyber-950 p-3 rounded-lg border border-slate-800 space-y-1">
            <div className="text-slate-400">Current Role: <strong className="text-cyan-300">{currentRole.name}</strong></div>
            <div className="text-slate-400">Title: <span className="text-slate-200">{currentRole.title}</span></div>
            <div className="text-slate-400">Clearance: <span className="text-amber-400 font-bold">{currentRole.clearance}</span></div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={clearAccessDenied}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded-lg shadow-alert-glow transition-colors"
          >
            Acknowledge Restriction
          </button>
        </div>
      </div>
    </div>
  );
}
