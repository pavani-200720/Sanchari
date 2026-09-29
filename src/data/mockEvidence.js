export const MOCK_EVIDENCE = [
  {
    id: "EVI-2026-88102",
    caseId: "CASE-2026-IN-089",
    fileName: "Offshore_Transfers_Encrypted_2026.pdf",
    category: "Financial Ledger Document",
    fileType: "application/pdf",
    fileSize: "4.8 MB",
    sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    md5Hash: "d41d8cd98f00b204e9800998ecf8427e",
    seizureDate: "2026-08-14 10:15:00",
    seizedBy: "Sub-Ins. P. Sharma",
    locationSeized: "Delhi Server Facility (Rack-4B)",
    classification: "TOP_SECRET",
    integrityStatus: "TAMPER_DETECTED", // Alert state for tamper replay demo
    evidenceDNA: {
      exifSoftware: "Adobe Acrobat Pro 24.1",
      deviceFingerprint: "DEV-MAC-88-12-FF-09-AA",
      sourceIp: "192.168.1.104",
      geoTag: "28.6139° N, 77.2090° E (New Delhi Cyber Cell)",
      fileHeaderHex: "25 50 44 46 2D 31 2E 37",
      mimeSignature: "PDF Document Structure (Valid)",
      creationTimestamp: "2026-08-13 23:42:11"
    },
    aiAnalysis: {
      confidenceScore: 96.4,
      riskLevel: "CRITICAL",
      summary: "Document contains 43 wire transfer records totaling $2.4M to offshore accounts. High statistical correlation with Suspect Alpha (R. K. Malhotra).",
      extractedEntities: [
        { type: "SUSPECT", text: "R. K. Malhotra", risk: "CRITICAL" },
        { type: "BANK", text: "Apex Global Bank (Cayman Islands)", risk: "HIGH" },
        { type: "IP_ADDRESS", text: "185.220.101.5 (Tor Exit Node)", risk: "SUSPICIOUS" },
        { type: "AMOUNT", text: "$2,400,000 USD", risk: "HIGH" }
      ],
      anomalies: [
        "Post-dated timestamp detected in internal PDF catalog stream",
        "Digital Certificate signature key mismatch at offset 0x004F20"
      ]
    },
    tamperState: {
      isTampered: true,
      tamperedAt: "2026-08-16 03:12:00 UTC",
      tamperedByActor: "UNKNOWN_REMOTE_IP (185.220.101.5)",
      originalHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      modifiedHash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      diffChanges: [
        { line: 42, before: "Transfer Amount: $2,400,000 USD to AC#9901-CA", after: "Transfer Amount: $240,000 USD to AC#9901-CA" },
        { line: 88, before: "Beneficiary: Apex Overseas Holdings Ltd", after: "Beneficiary: Shell Corp Asia Pacific" }
      ]
    }
  },
  {
    id: "EVI-2026-88103",
    caseId: "CASE-2026-IN-089",
    fileName: "Interceptor_PCAP_Traffic_Log.pcap",
    category: "Network Packet Capture",
    fileType: "application/vnd.tcpdump.pcap",
    fileSize: "128.4 MB",
    sha256Hash: "8f4e2a1b9c3d5e7f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f",
    md5Hash: "0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d",
    seizureDate: "2026-08-14 11:30:00",
    seizedBy: "Sub-Ins. P. Sharma",
    locationSeized: "Perimeter Gateway Firewall",
    classification: "SECRET",
    integrityStatus: "VERIFIED",
    evidenceDNA: {
      exifSoftware: "Wireshark / tcpdump 4.9.3",
      deviceFingerprint: "DEV-ROUTER-99-00-11",
      sourceIp: "10.0.4.12",
      geoTag: "28.6139° N, 77.2090° E",
      fileHeaderHex: "D4 C3 B2 A1 02 00 04 00",
      mimeSignature: "Libpcap Packet Capture",
      creationTimestamp: "2026-08-14 02:10:00"
    },
    aiAnalysis: {
      confidenceScore: 99.1,
      riskLevel: "HIGH",
      summary: "Identified outbound SSL encrypted tunnel to rogue C2 server port 443. Protocol anomaly detected in handshake bytes.",
      extractedEntities: [
        { type: "C2_SERVER", text: "185.220.101.5", risk: "CRITICAL" },
        { type: "MAC_ADDR", text: "00:1A:2B:3C:4D:5E", risk: "MEDIUM" }
      ],
      anomalies: [
        "Unusual beacon interval every 300 seconds"
      ]
    },
    tamperState: {
      isTampered: false,
      tamperedAt: null,
      tamperedByActor: null,
      originalHash: "8f4e2a1b9c3d5e7f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f",
      modifiedHash: "8f4e2a1b9c3d5e7f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f",
      diffChanges: []
    }
  },
  {
    id: "EVI-2026-88104",
    caseId: "CASE-2026-IN-104",
    fileName: "Encrypted_Signal_Chat_Backup.db",
    category: "Mobile Database",
    fileType: "application/x-sqlite3",
    fileSize: "14.2 MB",
    sha256Hash: "3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
    md5Hash: "1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e",
    seizureDate: "2026-08-23 09:00:00",
    seizedBy: "Ins. K. S. Nair",
    locationSeized: "Seized iPhone 15 Pro (Ex-01)",
    classification: "CONFIDENTIAL",
    integrityStatus: "VERIFIED",
    evidenceDNA: {
      exifSoftware: "Cellebrite UFED 7.62",
      deviceFingerprint: "IPHONE-SERIAL-F17L9921",
      sourceIp: "N/A (Physical Extraction)",
      geoTag: "19.0760° N, 72.8777° E (Mumbai Cyber Lab)",
      fileHeaderHex: "53 51 4C 69 74 65 20 66 6F 72 6D 61 74 20 33 00",
      mimeSignature: "SQLite 3 Database",
      creationTimestamp: "2026-08-22 18:40:00"
    },
    aiAnalysis: {
      confidenceScore: 94.8,
      riskLevel: "HIGH",
      summary: "Decrypted messages discuss hawala token codes 'DEL-X-99' and shell account routing via Dubai intermediaries.",
      extractedEntities: [
        { type: "TOKEN", text: "DEL-X-99", risk: "HIGH" },
        { type: "LOCATION", text: "Deira Dubai Vault", risk: "MEDIUM" }
      ],
      anomalies: []
    },
    tamperState: {
      isTampered: false,
      tamperedAt: null,
      tamperedByActor: null,
      originalHash: "3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
      modifiedHash: "3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
      diffChanges: []
    }
  }
];
