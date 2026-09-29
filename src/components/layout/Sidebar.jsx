import React from 'react';
import { 
  LayoutDashboard, 
  FolderLock, 
  FileCheck2, 
  Fingerprint, 
  BrainCircuit, 
  GitCommitHorizontal, 
  History, 
  Network, 
  Blocks, 
  ScrollText, 
  Share2, 
  ShieldAlert,
  SlidersHorizontal
} from 'lucide-react';

export default function Sidebar({ activeRoute, setActiveRoute }) {
  const menuSections = [
    {
      title: "COMMAND & CONTROL",
      items: [
        { id: "dashboard", label: "Investigation Dashboard", icon: LayoutDashboard, badge: "Live" },
        { id: "cases", label: "Case Management", icon: FolderLock },
        { id: "repository", label: "Evidence Repository", icon: FileCheck2 }
      ]
    },
    {
      title: "EVIDENCE INTELLIGENCE",
      items: [
        { id: "evidence-dna", label: "Evidence DNA", icon: Fingerprint, badge: "SHA-256" },
        { id: "ai-analysis", label: "AI Evidence Analysis", icon: BrainCircuit, badge: "AI" },
        { id: "chain-of-custody", label: "Chain of Custody", icon: GitCommitHorizontal },
        { id: "tamper-replay", label: "Tamper Replay", icon: History, badge: "Demo" },
        { id: "relationship-graph", label: "Relationship Graph", icon: Network }
      ]
    },
    {
      title: "SECURITY & INTEGRITY",
      items: [
        { id: "blockchain-ledger", label: "Blockchain Ledger", icon: Blocks },
        { id: "audit-logs", label: "Audit Logs", icon: ScrollText },
        { id: "secure-sharing", label: "Secure Sharing", icon: Share2 },
        { id: "security-center", label: "Security Center", icon: ShieldAlert }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-cyber-950/95 border-r border-slate-800/80 flex flex-col justify-between h-[calc(100vh-65px)] sticky top-[65px] z-10 select-none overflow-y-auto">
      <div className="p-4 space-y-6">
        {menuSections.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            <h3 className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveRoute(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 shadow-cyber-glow'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                        isActive 
                          ? 'bg-cyan-900/80 text-cyan-300 border-cyan-400/40' 
                          : 'bg-slate-900 text-slate-400 border-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* System Status Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-cyber-900/40">
        <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>NODE STATUS: ONLINE</span>
          </div>
          <span className="text-emerald-400">100%</span>
        </div>
      </div>
    </aside>
  );
}
