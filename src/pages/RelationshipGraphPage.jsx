import React, { useState } from 'react';
import { Network, User, FileText, Globe, Landmark, ScrollText, ArrowRight, Shield, Layers } from 'lucide-react';

export default function RelationshipGraphPage({ setActiveRoute }) {
  const [selectedNode, setSelectedNode] = useState(null);

  const graphNodes = [
    { id: 'n1', type: 'CASE', label: 'CASE-2026-IN-089', sub: 'Operation CyberShield', x: 250, y: 80, color: '#06b6d4' },
    { id: 'n2', type: 'FIR', label: 'FIR #CBI-ND-2026-4421', sub: 'Court Reference', x: 100, y: 180, color: '#eab308' },
    { id: 'n3', type: 'SUSPECT', label: 'R. K. Malhotra', sub: 'Suspect Alpha', x: 420, y: 180, color: '#ef4444' },
    { id: 'n4', type: 'WITNESS', label: 'Dr. S. K. Nanda', sub: 'System Admin Witness', x: 550, y: 280, color: '#10b981' },
    { id: 'n5', type: 'EVIDENCE', label: 'EVI-2026-88102', sub: 'Offshore_Transfers.pdf', x: 250, y: 280, color: '#a855f7' },
    { id: 'n6', type: 'BANK', label: 'Apex Global Bank', sub: 'AC#9901 (Cayman)', x: 100, y: 380, color: '#f59e0b' },
    { id: 'n7', type: 'REPORT', label: 'CFSL-RPT-8819', sub: 'Forensic Lab Audit', x: 400, y: 380, color: '#06b6d4' }
  ];

  const connections = [
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 'n3' },
    { from: 'n1', to: 'n5' },
    { from: 'n3', to: 'n5' },
    { from: 'n5', to: 'n6' },
    { from: 'n3', to: 'n4' },
    { from: 'n5', to: 'n7' }
  ];

  const activeNode = selectedNode || graphNodes[0];

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
          <Network className="w-5 h-5 text-cyan-400" />
          <span>EVIDENCE RELATIONSHIP CLUSTER GRAPH</span>
        </h2>
        <p className="text-xs text-slate-400 font-mono mt-1">Interactive network connecting Case ↔ FIR ↔ Suspect ↔ Witness ↔ Transaction ↔ Evidence ↔ Forensic Report</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive Network Viewport */}
        <div className="lg:col-span-3 cyber-card min-h-[500px] flex flex-col justify-between relative overflow-hidden bg-cyber-950/90">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 z-10">
            <span className="font-mono text-xs font-bold text-slate-300">INTERACTIVE GRAPH CANVAS</span>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="cyber-badge cyber-badge-cyan">7 ENTITY NODES</span>
              <span className="cyber-badge cyber-badge-emerald">7 LINKED ARCS</span>
            </div>
          </div>

          {/* SVG Canvas for Lines */}
          <div className="relative w-full h-[400px] my-auto">
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {connections.map((c, idx) => {
                const n1 = graphNodes.find(n => n.id === c.from);
                const n2 = graphNodes.find(n => n.id === c.to);
                if (!n1 || !n2) return null;
                const isHighlighted = activeNode.id === n1.id || activeNode.id === n2.id;
                return (
                  <line 
                    key={idx}
                    x1={`${(n1.x / 650) * 100}%`}
                    y1={`${(n1.y / 450) * 100}%`}
                    x2={`${(n2.x / 650) * 100}%`}
                    y2={`${(n2.y / 450) * 100}%`}
                    stroke={isHighlighted ? '#06b6d4' : '#334155'}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    strokeDasharray={isHighlighted ? 'none' : '4 4'}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {graphNodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${(node.x / 650) * 85}%`, top: `${(node.y / 450) * 80}%` }}
                  className={`absolute p-3 rounded-xl border font-mono text-xs transition-all flex flex-col items-center z-10 ${
                    isSelected 
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-200 scale-110 shadow-cyber-glow' 
                      : 'bg-cyber-900 border-slate-700 text-slate-200 hover:border-slate-500'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full mb-1" style={{ backgroundColor: node.color }}></span>
                  <span className="font-bold text-[11px]">{node.label}</span>
                  <span className="text-[9px] text-slate-400">{node.sub}</span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-800 pt-3 text-[11px] font-mono text-slate-400 z-10 flex items-center justify-between">
            <span>Click any node to inspect relationship parameters.</span>
            <span className="text-cyan-400 font-bold">Node: {activeNode.label}</span>
          </div>
        </div>

        {/* Selected Node Details & Next Stage Button */}
        <div className="space-y-6">
          <div className="cyber-card space-y-4">
            <h3 className="font-mono font-bold text-sm text-slate-200 border-b border-slate-800 pb-3">
              ENTITY RELATIONSHIP DRAWER
            </h3>
            <div className="space-y-3 text-xs font-mono text-slate-300">
              <div className="bg-cyber-950 p-3 rounded border border-slate-800">
                <span className="text-slate-500 block">Entity Label:</span>
                <span className="text-cyan-400 font-bold text-sm">{activeNode.label}</span>
              </div>
              <div className="bg-cyber-950 p-3 rounded border border-slate-800">
                <span className="text-slate-500 block">Category Type:</span>
                <span className="text-emerald-400 font-bold">{activeNode.type}</span>
              </div>
              <p className="text-slate-400 text-[11px] font-sans">
                Cross-referenced with 3 active law-enforcement dockets in CERT-In and CBI databases.
              </p>
            </div>
          </div>

          <div className="cyber-card space-y-3">
            <h3 className="font-mono font-bold text-xs text-slate-300 uppercase tracking-wider">NEXT WORKFLOW STAGE</h3>
            <button
              onClick={() => setActiveRoute('audit-logs')}
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-cyber-glow"
            >
              <ScrollText className="w-4 h-4" />
              <span>Inspect System Audit Logs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
