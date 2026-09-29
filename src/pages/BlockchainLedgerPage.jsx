import React, { useState } from 'react';
import { useBlockchain } from '../context/BlockchainContext';
import { Blocks, ShieldCheck, Cpu, Key, CheckCircle2, RefreshCw, AlertTriangle } from 'lucide-react';
import DisclaimerNotice from '../components/common/DisclaimerNotice';

export default function BlockchainLedgerPage() {
  const { blocks, runIntegrityCheck, isVerifying, lastVerificationResult } = useBlockchain();

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
            <Blocks className="w-5 h-5 text-purple-400" />
            <span>BLOCKCHAIN-INSPIRED INTEGRITY LEDGER</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Immutable permissioned blockchain block explorer validating evidence genesis hashes</p>
        </div>

        <button 
          onClick={() => runIntegrityCheck("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")}
          disabled={isVerifying}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold rounded-lg flex items-center gap-2 shadow-cyber-glow transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
          <span>{isVerifying ? 'Scanning Ledger...' : 'Scan & Validate Merkle Root'}</span>
        </button>
      </div>

      <DisclaimerNotice />

      {/* Verification Scanner Result */}
      {lastVerificationResult && (
        <div className={`p-4 rounded-xl border font-mono text-xs space-y-2 ${
          lastVerificationResult.status === 'VERIFIED_ON_CHAIN'
            ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
            : 'bg-red-950/40 border-red-500/60 text-red-200'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>GENESIS BLOCK INTEGRITY VERIFIED</span>
          </div>
          <div>Block Index: #{lastVerificationResult.blockIndex} • Validated By: {lastVerificationResult.validatorNode}</div>
          <div className="text-[11px] text-slate-300">Merkle Root: {lastVerificationResult.merkleRoot}</div>
        </div>
      )}

      {/* Block Explorer List */}
      <div className="space-y-4">
        {blocks.map((block) => (
          <div key={block.blockIndex} className="cyber-card space-y-3 border-l-4 border-l-purple-500">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-mono font-bold text-sm text-purple-300">BLOCK #{block.blockIndex}</span>
              <span className="cyber-badge cyber-badge-purple">VALIDATED BY {block.validatorNode}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-cyber-950 p-3 rounded border border-slate-800 break-all">
                <span className="text-slate-500 block">Block Hash:</span>
                <span className="text-slate-200">{block.currentHash}</span>
              </div>
              <div className="bg-cyber-950 p-3 rounded border border-slate-800 break-all">
                <span className="text-slate-500 block">Previous Block Hash:</span>
                <span className="text-slate-400">{block.previousHash}</span>
              </div>
            </div>

            <div className="bg-cyber-950 p-3 rounded border border-slate-800 font-mono text-xs text-slate-300">
              <span className="text-slate-500 block mb-1">Payload Transaction:</span>
              {block.transactions.map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="font-semibold text-cyan-400">{tx.type}</span>
                  <span className="text-slate-400">{tx.evidenceId || tx.caseId}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
