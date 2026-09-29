import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, UserCheck, Scale, Database } from 'lucide-react';

export default function RoleBadge() {
  const { currentRole } = useAuth();

  const getRoleIcon = () => {
    switch (currentRole.id) {
      case 'INVESTIGATING_OFFICER':
        return <Shield className="w-3.5 h-3.5 text-emerald-400" />;
      case 'FORENSIC_ANALYST':
        return <UserCheck className="w-3.5 h-3.5 text-cyan-400" />;
      case 'PUBLIC_PROSECUTOR':
        return <Scale className="w-3.5 h-3.5 text-purple-400" />;
      case 'SYSTEM_ADMIN':
        return <Database className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Shield className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-lg shadow-sm">
      {getRoleIcon()}
      <div className="flex flex-col text-left">
        <span className="text-xs font-semibold text-slate-100 leading-none">{currentRole.name}</span>
        <span className="text-[10px] font-mono text-slate-400 leading-tight mt-0.5">{currentRole.title} ({currentRole.agency})</span>
      </div>
    </div>
  );
}
