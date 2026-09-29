import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import RoleBadge from './RoleBadge';
import { Search, Bell, Shield, ChevronDown, KeyRound } from 'lucide-react';

export default function Navbar({ onOpenSearch }) {
  const { currentRole, switchRole, USER_ROLES } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  return (
    <nav className="bg-cyber-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
      {/* Brand Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-cyber-glow">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-mono font-extrabold text-lg tracking-wider text-slate-100 flex items-center gap-2">
            <span>SANCHARI</span>
            <span className="text-cyan-400 font-sans text-xs bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">DMS v2.4</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-mono tracking-tight">SECURE DIGITAL EVIDENCE & DOCUMENT INTELLIGENCE PLATFORM</p>
        </div>
      </div>

      {/* Global Quick Search */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
        <button 
          onClick={onOpenSearch}
          className="w-full bg-cyber-950/90 border border-slate-700/80 hover:border-cyan-500/50 rounded-lg px-4 py-2 flex items-center justify-between text-slate-400 text-xs font-mono transition-all group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            <span>Search Case ID, SHA-256 Hash, Evidence DNA...</span>
          </div>
          <kbd className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700">Ctrl + K</kbd>
        </button>
      </div>

      {/* Persona Role Switcher & Notifications */}
      <div className="flex items-center gap-4">
        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            title="Switch User Persona / Role"
          >
            <RoleBadge />
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-cyber-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50">
              <div className="px-3 py-1.5 border-b border-slate-800 mb-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Switch Operational Persona</span>
              </div>
              {Object.keys(USER_ROLES).map((roleKey) => {
                const role = USER_ROLES[roleKey];
                const isSelected = currentRole.id === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => {
                      switchRole(roleKey);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex flex-col transition-colors ${
                      isSelected 
                        ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300' 
                        : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="font-semibold">{role.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{role.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Notifications Alert */}
        <button className="relative p-2 text-slate-400 hover:text-cyan-400 bg-cyber-950/80 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </nav>
  );
}
