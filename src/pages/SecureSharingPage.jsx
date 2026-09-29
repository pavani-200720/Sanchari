import React, { useState } from 'react';
import { useCase } from '../context/CaseContext';
import { useAuth } from '../context/AuthContext';
import { Share2, Lock, ShieldCheck, Download, Clock, Copy, CheckCircle2 } from 'lucide-react';

export default function SecureSharingPage() {
  const { sharedLinks, addSharedLink, activeEvidence } = useCase();
  const { currentRole, checkPermission } = useAuth();

  const [recipient, setRecipient] = useState("High Court Bench (CBI Special Counsel)");
  const [expiry, setExpiry] = useState("24 Hours");
  const [watermark, setWatermark] = useState(`CONFIDENTIAL COURT DISCLOSURE - ${currentRole.name.toUpperCase()}`);
  const [copied, setCopied] = useState(false);
  const [lastGenerated, setLastGenerated] = useState(null);

  const handleGenerateLink = (e) => {
    e.preventDefault();

    // Check RBAC permission for Exporting Judicial Bundles
    if (!checkPermission('EXPORT_COURT')) return;

    const token = Math.floor(100000 + Math.random() * 900000);
    const generatedUrl = `https://sanchari.dms.gov.in/export/judicial/token-${token}-exp-${expiry.toLowerCase().replace(' ', '')}`;

    const newLinkObj = {
      id: `SHR-${Math.floor(1000 + Math.random() * 9000)}`,
      evidenceId: activeEvidence.id,
      recipient,
      expiry,
      watermark,
      url: generatedUrl,
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    addSharedLink(newLinkObj);
    setLastGenerated(newLinkObj);
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-emerald-400" />
          <span>SECURE JUDICIAL SHARING & DIGITAL WATERMARKING</span>
        </h2>
        <p className="text-xs text-slate-400 font-mono mt-1">Time-limited self-destructing links with dynamic digital watermark overlays for court prosecution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Link Generator Form */}
        <form onSubmit={handleGenerateLink} className="cyber-card space-y-4">
          <h3 className="font-mono font-bold text-sm text-slate-200 border-b border-slate-800 pb-3">
            GENERATE JUDICIAL EXPORT BUNDLE
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">Target Recipient / Authority:</label>
              <input 
                type="text" 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-cyber-950 border border-slate-700 rounded p-2.5 text-slate-100"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Access Expiration Window:</label>
              <select 
                value={expiry} 
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full bg-cyber-950 border border-slate-700 rounded p-2.5 text-slate-100"
              >
                <option value="1 Hour">1 Hour (Emergency Warrant Review)</option>
                <option value="24 Hours">24 Hours (Standard Court Disclosure)</option>
                <option value="72 Hours">72 Hours (Judicial Bench Review)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Dynamic Watermark Text Overlay:</label>
              <input 
                type="text" 
                value={watermark}
                onChange={(e) => setWatermark(e.target.value)}
                className="w-full bg-cyber-950 border border-slate-700 rounded p-2.5 text-slate-100"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors shadow-emerald-glow flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Generate Watermarked Token Link</span>
            </button>
          </div>
        </form>

        {/* Generated Token Result Card */}
        <div className="cyber-card space-y-4">
          <h3 className="font-mono font-bold text-sm text-slate-200 border-b border-slate-800 pb-3">
            GENERATED TOKEN & WATERMARK PREVIEW
          </h3>

          {lastGenerated ? (
            <div className="space-y-3 font-mono text-xs">
              <div className="bg-cyber-950 p-3 rounded border border-emerald-500/40 flex items-center justify-between gap-2">
                <span className="text-emerald-300 font-bold truncate">{lastGenerated.url}</span>
                <button 
                  onClick={() => handleCopy(lastGenerated.url)}
                  className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded shrink-0"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Watermark Visual Overlay Box */}
              <div className="relative bg-slate-950 p-6 rounded-xl border border-slate-800 text-center overflow-hidden min-h-[120px] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 rotate-[-15deg] pointer-events-none text-red-500 font-mono font-extrabold text-sm tracking-widest uppercase">
                  {lastGenerated.watermark}
                </div>
                <div className="relative z-10 text-slate-300 text-xs font-sans">
                  <strong>EVIDENCE ITEM: {lastGenerated.evidenceId}</strong>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">Recipient: {lastGenerated.recipient} • Expiry: {lastGenerated.expiry}</div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 font-mono italic">Click 'Generate Watermarked Token Link' to issue a court export link.</p>
          )}
        </div>
      </div>

      {/* Active Sharing Records Table */}
      <div className="cyber-card space-y-4">
        <h3 className="font-mono font-bold text-sm text-slate-200 border-b border-slate-800 pb-3">
          ACTIVE JUDICIAL SHARING AUDIT RECORDS
        </h3>
        <table className="cyber-table">
          <thead>
            <tr>
              <th>Share ID</th>
              <th>Evidence ID</th>
              <th>Recipient</th>
              <th>Expiration</th>
              <th>Watermark Text</th>
              <th>Export Date</th>
            </tr>
          </thead>
          <tbody>
            {sharedLinks.map((link) => (
              <tr key={link.id}>
                <td className="font-mono text-cyan-400 font-bold">{link.id}</td>
                <td className="font-mono text-xs">{link.evidenceId}</td>
                <td className="font-semibold text-slate-200">{link.recipient}</td>
                <td className="font-mono text-xs text-amber-400">{link.expiry}</td>
                <td className="font-mono text-xs text-slate-400 max-w-xs truncate">{link.watermark}</td>
                <td className="font-mono text-xs">{link.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
