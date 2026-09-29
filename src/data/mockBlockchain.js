export const MOCK_BLOCKCHAIN = [
  {
    blockIndex: 40910,
    previousHash: "0000a39f1c884b2e9d71c3a5f821d94b0c9e7f6a5b4c3d2e1f0a9b8c7d6e5f4a",
    currentHash: "0000c812d45e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a",
    timestamp: "2026-08-14 09:30:00 UTC",
    validatorNode: "NODE-CERT-IN-DELHI-01",
    merkleRoot: "7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    nonce: 849201,
    transactions: [
      { type: "CASE_REGISTRATION", caseId: "CASE-2026-IN-089", officer: "Ins. Rajesh Verma" }
    ]
  },
  {
    blockIndex: 40912,
    previousHash: "0000c812d45e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a",
    currentHash: "0000f91a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e",
    timestamp: "2026-08-14 11:00:00 UTC",
    validatorNode: "NODE-CBI-FORENSIC-02",
    merkleRoot: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    nonce: 192843,
    transactions: [
      { 
        type: "EVIDENCE_GENESIS_INGESTION", 
        evidenceId: "EVI-2026-88102", 
        hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", 
        custodian: "Sub-Ins. P. Sharma" 
      }
    ]
  },
  {
    blockIndex: 40915,
    previousHash: "0000f91a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e",
    currentHash: "0000e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5",
    timestamp: "2026-08-16 09:35:00 UTC",
    validatorNode: "NODE-NIC-SUPREME-COURT-03",
    merkleRoot: "5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    nonce: 492019,
    transactions: [
      { 
        type: "TAMPER_ALERT_FLAG", 
        evidenceId: "EVI-2026-88102", 
        flaggedHash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069", 
        status: "QUARANTINED_RESTORED" 
      }
    ]
  }
];
