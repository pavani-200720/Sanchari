export const MOCK_CHAIN_OF_CUSTODY = [
  {
    id: "COC-88102-1",
    evidenceId: "EVI-2026-88102",
    stepNumber: 1,
    action: "Physical Seizure & Disk Image Creation",
    actor: "Sub-Ins. P. Sharma",
    role: "Seizing Officer",
    agency: "CERT-In Cyber Cell Delhi",
    timestamp: "2026-08-14 10:15:00 UTC",
    location: "Rack-4B, Delhi Central Server Facility",
    hashAtTransfer: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    verifiedStatus: "MATCHED",
    digitalSignature: "SIG-PKI-SHARMA-99120",
    notes: "Physical drive removed under Form-7 evidence warrant. Write-blocker hardware attached during bit-stream cloning."
  },
  {
    id: "COC-88102-2",
    evidenceId: "EVI-2026-88102",
    stepNumber: 2,
    action: "Automated Cryptographic Ingestion",
    actor: "SANCHARI Ingestion Gateway",
    role: "System Service",
    agency: "SANCHARI DMS Secure Node-01",
    timestamp: "2026-08-14 11:00:00 UTC",
    location: "SANCHARI High-Security Repository",
    hashAtTransfer: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    verifiedStatus: "MATCHED",
    digitalSignature: "SIG-SANCHARI-VAULT-001",
    notes: "SHA-256 and MD5 computed upon arrival. Registered in Blockchain Block #40912."
  },
  {
    id: "COC-88102-3",
    evidenceId: "EVI-2026-88102",
    stepNumber: 3,
    action: "UNAUTHORIZED EXPORT & ACCESS DETECTED",
    actor: "UNKNOWN_REMOTE_IP (185.220.101.5)",
    role: "Unauthenticated External Actor",
    agency: "External Tor Exit Node",
    timestamp: "2026-08-16 03:12:00 UTC",
    location: "Remote Endpoint / Intercepted Stream",
    hashAtTransfer: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    verifiedStatus: "HASH_MISMATCH", // GAP DETECTOR ANOMALY!
    digitalSignature: "INVALID_OR_MISSING",
    notes: "ALERT: File SHA-256 hash changed from original genesis hash. Modified lines 42 and 88 detected by automated Gap Analysis."
  },
  {
    id: "COC-88102-4",
    evidenceId: "EVI-2026-88102",
    stepNumber: 4,
    action: "Forensic Triage & Re-Verification",
    actor: "Dr. Ananya Roy",
    role: "Lead Forensic Specialist",
    agency: "CFSL Cyber Lab",
    timestamp: "2026-08-16 09:30:00 UTC",
    location: "Forensic Workstation #04",
    hashAtTransfer: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // Restored from Genesis Block
    verifiedStatus: "RESTORED_FROM_LEDGER",
    digitalSignature: "SIG-PKI-ROY-88194",
    notes: "File integrity restored using SANCHARI Blockchain Genesis Ledger. Tamper incident flagged for Security Audit."
  }
];
