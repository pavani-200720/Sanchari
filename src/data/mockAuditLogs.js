export const MOCK_AUDIT_LOGS = [
  {
    id: "LOG-99201",
    timestamp: "2026-08-16 09:30:15 UTC",
    user: "Dr. Ananya Roy (Forensic Analyst)",
    userRole: "FORENSIC_ANALYST",
    ipAddress: "10.0.4.18 (Internal Subnet)",
    action: "EVIDENCE_DNA_VIEW",
    targetResource: "EVI-2026-88102 (Offshore_Transfers_Encrypted_2026.pdf)",
    result: "SUCCESS",
    securityClassification: "RESTRICTED",
    hashVerification: "PASSED"
  },
  {
    id: "LOG-99202",
    timestamp: "2026-08-16 03:12:00 UTC",
    user: "UNKNOWN_REMOTE_IP",
    userRole: "UNAUTHORIZED",
    ipAddress: "185.220.101.5 (Tor Network)",
    action: "ATTEMPTED_HASH_MUTATION",
    targetResource: "EVI-2026-88102",
    result: "BLOCKED_BY_BLOCKCHAIN",
    securityClassification: "CRITICAL_ALERT",
    hashVerification: "TAMPER_FLAGGED"
  },
  {
    id: "LOG-99203",
    timestamp: "2026-08-15 16:45:22 UTC",
    user: "Adv. V. Swaminathan (Public Prosecutor)",
    userRole: "PUBLIC_PROSECUTOR",
    ipAddress: "10.0.8.44 (High Court Node)",
    action: "COURT_DISCLOSURE_EXPORT",
    targetResource: "CASE-2026-IN-089 Evidence Bundle",
    result: "WATERMARKED_EXPORT_GENERATED",
    securityClassification: "TOP_SECRET",
    hashVerification: "PASSED"
  }
];
