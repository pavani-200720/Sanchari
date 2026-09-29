import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CaseProvider } from './context/CaseContext';
import { BlockchainProvider } from './context/BlockchainContext';

import HeaderBanner from './components/layout/HeaderBanner';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import UploadEvidenceModal from './components/evidence/UploadEvidenceModal';
import AccessDeniedModal from './components/common/AccessDeniedModal';

import DashboardPage from './pages/DashboardPage';
import CasesPage from './pages/CasesPage';
import EvidenceRepositoryPage from './pages/EvidenceRepositoryPage';
import EvidenceDNAPage from './pages/EvidenceDNAPage';
import AIAnalysisPage from './pages/AIAnalysisPage';
import ChainOfCustodyPage from './pages/ChainOfCustodyPage';
import TamperReplayPage from './pages/TamperReplayPage';
import RelationshipGraphPage from './pages/RelationshipGraphPage';
import BlockchainLedgerPage from './pages/BlockchainLedgerPage';
import AuditLogsPage from './pages/AuditLogsPage';
import SecureSharingPage from './pages/SecureSharingPage';
import SecurityCenterPage from './pages/SecurityCenterPage';
import LoginPage from './pages/LoginPage';

import { Search, X } from 'lucide-react';

export default function App() {
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const renderActiveRoute = () => {
    switch (activeRoute) {
      case 'dashboard':
        return <DashboardPage setActiveRoute={setActiveRoute} onOpenUploadModal={() => setIsUploadModalOpen(true)} />;
      case 'cases':
        return <CasesPage setActiveRoute={setActiveRoute} />;
      case 'repository':
        return <EvidenceRepositoryPage setActiveRoute={setActiveRoute} onOpenUploadModal={() => setIsUploadModalOpen(true)} />;
      case 'evidence-dna':
        return <EvidenceDNAPage setActiveRoute={setActiveRoute} />;
      case 'ai-analysis':
        return <AIAnalysisPage setActiveRoute={setActiveRoute} />;
      case 'chain-of-custody':
        return <ChainOfCustodyPage setActiveRoute={setActiveRoute} />;
      case 'tamper-replay':
        return <TamperReplayPage setActiveRoute={setActiveRoute} />;
      case 'relationship-graph':
        return <RelationshipGraphPage setActiveRoute={setActiveRoute} />;
      case 'blockchain-ledger':
        return <BlockchainLedgerPage setActiveRoute={setActiveRoute} />;
      case 'audit-logs':
        return <AuditLogsPage setActiveRoute={setActiveRoute} />;
      case 'secure-sharing':
        return <SecureSharingPage setActiveRoute={setActiveRoute} />;
      case 'security-center':
        return <SecurityCenterPage setActiveRoute={setActiveRoute} />;
      case 'login':
        return <LoginPage onLoginSuccess={() => setActiveRoute('dashboard')} />;
      default:
        return <DashboardPage setActiveRoute={setActiveRoute} onOpenUploadModal={() => setIsUploadModalOpen(true)} />;
    }
  };

  return (
    <AuthProvider>
      <CaseProvider>
        <BlockchainProvider>
          <div className="min-h-screen bg-cyber-950 text-slate-100 flex flex-col font-sans">
            <HeaderBanner />
            <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

            <div className="flex flex-1">
              <Sidebar activeRoute={activeRoute} setActiveRoute={setActiveRoute} />

              <main className="flex-1 p-6 max-w-7xl mx-auto w-full overflow-y-auto">
                {renderActiveRoute()}
              </main>
            </div>

            {/* Global Ingestion Upload Modal */}
            <UploadEvidenceModal 
              isOpen={isUploadModalOpen} 
              onClose={() => setIsUploadModalOpen(false)} 
            />

            {/* Global Access Denied Modal for RBAC violations */}
            <AccessDeniedModal />

            {/* Quick Search Modal */}
            {isSearchOpen && (
              <div className="fixed inset-0 bg-cyber-950/80 backdrop-blur-sm flex items-start justify-center pt-20 z-50 p-4">
                <div className="bg-cyber-900 border border-slate-700 rounded-2xl w-full max-w-xl p-4 shadow-2xl space-y-4 text-left">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2 text-slate-400 font-mono text-xs w-full">
                      <Search className="w-4 h-4 text-cyan-400" />
                      <input 
                        type="text" 
                        placeholder="Search Cases, SHA-256 Hashes, Suspects, IP addresses..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none text-slate-100 focus:outline-none w-full text-sm font-sans"
                        autoFocus
                      />
                    </div>
                    <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-slate-200">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-xs font-mono text-slate-400 space-y-2">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500">Quick Navigation Suggestions:</div>
                    <button 
                      onClick={() => { setActiveRoute('repository'); setIsSearchOpen(false); }}
                      className="w-full text-left p-2 rounded hover:bg-slate-800 text-cyan-300 font-semibold flex justify-between"
                    >
                      <span>Search Evidence Repository</span>
                      <span className="text-slate-500">EVI-2026-88102</span>
                    </button>
                    <button 
                      onClick={() => { setActiveRoute('blockchain-ledger'); setIsSearchOpen(false); }}
                      className="w-full text-left p-2 rounded hover:bg-slate-800 text-purple-300 font-semibold flex justify-between"
                    >
                      <span>Scan Blockchain Genesis Blocks</span>
                      <span className="text-slate-500">Block #40915</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </BlockchainProvider>
      </CaseProvider>
    </AuthProvider>
  );
}
