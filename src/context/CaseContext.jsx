import React, { createContext, useContext, useState } from 'react';
import { MOCK_CASES } from '../data/mockCases';
import { MOCK_EVIDENCE } from '../data/mockEvidence';
import { MOCK_CHAIN_OF_CUSTODY } from '../data/mockChainOfCustody';
import { MOCK_AUDIT_LOGS } from '../data/mockAuditLogs';

const CaseContext = createContext();

export function CaseProvider({ children }) {
  const [cases, setCases] = useState(MOCK_CASES);
  const [evidenceList, setEvidenceList] = useState(MOCK_EVIDENCE);
  const [custodyLogs, setCustodyLogs] = useState(MOCK_CHAIN_OF_CUSTODY);
  const [auditLogs, setAuditLogs] = useState(MOCK_AUDIT_LOGS);
  const [activeCaseId, setActiveCaseId] = useState("CASE-2026-IN-089");
  const [activeEvidenceId, setActiveEvidenceId] = useState("EVI-2026-88102");
  const [sharedLinks, setSharedLinks] = useState([
    {
      id: "SHR-9901",
      evidenceId: "EVI-2026-88102",
      recipient: "High Court Bench",
      expiry: "2026-09-30 23:59:00 UTC",
      watermark: "CONFIDENTIAL COURT DISCLOSURE - ADV V. SWAMINATHAN",
      url: "https://sanchari.dms.gov.in/export/judicial/token-779012-exp-24h",
      createdDate: "2026-08-18 16:00:00"
    }
  ]);

  const activeCase = cases.find(c => c.id === activeCaseId) || cases[0];
  const activeEvidence = evidenceList.find(e => e.id === activeEvidenceId) || evidenceList[0];

  // Function to Record New Audit Log Event
  const recordAuditLog = (user, role, action, targetResource, result = "SUCCESS") => {
    const newLog = {
      id: `LOG-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      user,
      userRole: role,
      ipAddress: "10.0.4.18 (Internal Subnet)",
      action,
      targetResource,
      result,
      securityClassification: "TOP_SECRET",
      hashVerification: "PASSED"
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Function to Add Newly Uploaded Evidence
  const addUploadedEvidence = (newEvidence) => {
    setEvidenceList(prev => [newEvidence, ...prev]);
    setActiveEvidenceId(newEvidence.id);

    // Update case evidence count
    setCases(prev => prev.map(c => {
      if (c.id === newEvidence.caseId) {
        return { ...c, evidenceCount: c.evidenceCount + 1 };
      }
      return c;
    }));

    // Add genesis chain of custody log
    const genesisCustodyLog = {
      id: `COC-${newEvidence.id}-1`,
      evidenceId: newEvidence.id,
      stepNumber: 1,
      action: "Digital Evidence Ingestion & Hash Registration",
      actor: newEvidence.seizedBy,
      role: "Seizing Investigator",
      agency: "CERT-In Cyber Cell",
      timestamp: newEvidence.seizureDate,
      location: newEvidence.evidenceDNA.geoTag,
      hashAtTransfer: newEvidence.sha256Hash,
      verifiedStatus: "MATCHED",
      digitalSignature: `SIG-INGEST-${Math.floor(1000 + Math.random() * 9000)}`,
      notes: "Ingested via SANCHARI DMS Secure Upload Gateway. Genesis SHA-256 registered on Blockchain."
    };
    setCustodyLogs(prev => [...prev, genesisCustodyLog]);

    recordAuditLog("Ins. Rajesh Verma", "INVESTIGATOR", "EVIDENCE_INGESTION", `${newEvidence.id} (${newEvidence.fileName})`);
  };

  // Function to Add Shared Link
  const addSharedLink = (newLink) => {
    setSharedLinks(prev => [newLink, ...prev]);
    recordAuditLog("Adv. V. Swaminathan", "LEGAL_OFFICER", "JUDICIAL_LINK_EXPORT", `${newLink.evidenceId} -> ${newLink.recipient}`);
  };

  // Simulated Tamper Toggle for Prototype Demo
  const toggleTamperSimulation = (evidenceId) => {
    setEvidenceList(prev => prev.map(item => {
      if (item.id === evidenceId) {
        const isNowTampered = !item.tamperState.isTampered;
        return {
          ...item,
          integrityStatus: isNowTampered ? "TAMPER_DETECTED" : "VERIFIED",
          tamperState: {
            ...item.tamperState,
            isTampered: isNowTampered
          }
        };
      }
      return item;
    }));
  };

  return (
    <CaseContext.Provider value={{
      cases,
      evidenceList,
      custodyLogs,
      auditLogs,
      sharedLinks,
      activeCaseId,
      setActiveCaseId,
      activeEvidenceId,
      setActiveEvidenceId,
      activeCase,
      activeEvidence,
      toggleTamperSimulation,
      addUploadedEvidence,
      addSharedLink,
      recordAuditLog
    }}>
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
}
