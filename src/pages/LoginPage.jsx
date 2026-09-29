import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, KeyRound, Lock, UserCheck, ShieldCheck, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const { USER_ROLES, switchRole } = useAuth();
  const [selectedRoleKey, setSelectedRoleKey] = useState('INVESTIGATOR');
  const [username, setUsername] = useState('rajesh.verma@cert-in.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      switchRole(selectedRoleKey);
      setIsAuthenticating(false);
      onLoginSuccess();
    }, 600);
  };

  const handleQuickDemoLogin = (roleKey) => {
    setSelectedRoleKey(roleKey);
    const role = USER_ROLES[roleKey];
    setUsername(`${role.name.toLowerCase().replace(/[^a-z]/g, '')}@sanchari.gov.in`);
    setIsAuthenticating(true);
    setTimeout(() => {
      switchRole(roleKey);
      setIsAuthenticating(false);
      onLoginSuccess();
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl w-full items-center">
        {/* Left Branding & Cyber Security Panel */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-cyber-glow">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-mono font-extrabold text-slate-100 tracking-wider">SANCHARI DMS</h1>
              <p className="text-xs text-cyan-400 font-mono">SIH 2026 DIGITAL EVIDENCE PLATFORM</p>
            </div>
          </div>

          <div className="space-y-3 text-slate-300 text-xs leading-relaxed font-sans">
            <p className="text-slate-300 font-medium text-sm">
              Secure Digital Document Management System for Legal and Investigation Documents (SIH26190).
            </p>
            <p className="text-slate-400">
              Designed for law-enforcement agencies, forensic investigators, and judicial courts with immutable blockchain-inspired verification and AI intelligence.
            </p>
          </div>

          {/* Security Status Badges */}
          <div className="space-y-2 border-t border-slate-800 pt-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>PKI HARDWARE CERTIFICATE 256-BIT ENCRYPTION</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>GENESIS LEDGER NODE #40915 ONLINE</span>
            </div>
          </div>
        </div>

        {/* Right Authentication Card */}
        <div className="lg:col-span-6 cyber-card p-8 space-y-6 border-cyan-500/30 shadow-2xl bg-cyber-900/90">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-mono font-bold text-slate-100 flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              <span>AUTHENTICATION PORTAL</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">Select persona or input legal credentials to launch session</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-slate-300 block mb-1">Username / Official Email:</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-cyber-950 border border-slate-700 focus:border-cyan-500 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Passcode / PKI Certificate Pin:</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cyber-950 border border-slate-700 focus:border-cyan-500 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none"
                required
              />
            </div>

            {/* Role Selection Options */}
            <div>
              <label className="text-slate-300 block mb-1">Operational Persona / Role:</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(USER_ROLES).map((roleKey) => {
                  const role = USER_ROLES[roleKey];
                  const isSelected = selectedRoleKey === roleKey;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRoleKey(roleKey)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        isSelected 
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-cyber-glow' 
                          : 'bg-cyber-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold">{role.name.split(' ')[0]} {role.name.split(' ')[1] || ''}</div>
                      <div className="text-[10px] text-slate-500 truncate">{role.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-cyber-glow transition-all"
            >
              {isAuthenticating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating PKI Session...</span>
                </>
              ) : (
                <>
                  <span>Launch Secure Session</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Preset Buttons */}
          <div className="border-t border-slate-800 pt-4 space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">SIH Jury Quick Demo Personas:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickDemoLogin('INVESTIGATOR')}
                className="px-2.5 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 rounded text-[11px] font-mono flex items-center justify-between"
              >
                <span>Investigator</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </button>

              <button
                onClick={() => handleQuickDemoLogin('LEGAL_OFFICER')}
                className="px-2.5 py-1.5 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-300 rounded text-[11px] font-mono flex items-center justify-between"
              >
                <span>Legal Officer</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              </button>

              <button
                onClick={() => handleQuickDemoLogin('ADMIN')}
                className="px-2.5 py-1.5 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 text-amber-300 rounded text-[11px] font-mono flex items-center justify-between"
              >
                <span>System Admin</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              </button>

              <button
                onClick={() => handleQuickDemoLogin('VIEWER')}
                className="px-2.5 py-1.5 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 rounded text-[11px] font-mono flex items-center justify-between"
              >
                <span>Viewer (Read-Only)</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
