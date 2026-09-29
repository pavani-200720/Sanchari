import React, { useState } from 'react';
import { useCase } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import { Upload, CheckCircle2, ShieldCheck, Fingerprint, BrainCircuit, HardDrive, X, FileUp, Cpu, Lock } from 'lucide-react';

export default function UploadEvidenceModal({ isOpen, onClose }) {
  const { cases, addUploadedEvidence } = useCase();
  const { currentRole, checkPermission } = useAuth();

  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id || "CASE-2026-IN-089");
  const [fileName, setFileName] = useState("Encrypted_Server_Backup_Exfiltration_2026.pdf");
  const [category, setCategory] = useState("Encrypted Disk Image / Document");
  const [seizedBy, setSeizedBy] = useState(currentRole.name);
  const [uploadStep, setUploadStep] = useState(0); // 0: Idle, 1..7: Progress Steps, 8: Complete
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const pipelineSteps = [
    { name: "1. FILE UPLOAD", desc: "Receiving raw bitstream file payload" },
    { name: "2. MIME VALIDATION", desc: "Verifying binary file header signatures" },
    { name: "3. METADATA EXTRACTION", desc: "Extracting EXIF, serials, and geo-tags" },
    { name: "4. AI CLASSIFICATION", desc: "Running NLP entity & risk classification" },
    { name: "5. HASH GENERATION", desc: "Computing 256-bit SHA-256 genesis fingerprint" },
    { name: "6. BLOCKCHAIN VERIFICATION", desc: "Registering block genesis transaction on chain" },
    { name: "7. SECURE STORAGE", desc: "Encrypted AES-256 vault storage write" }
  ];

  const handleStartIngestion = (e) => {
    e.preventDefault();

    // Check RBAC permission for Uploading Evidence
    if (!checkPermission('UPLOAD_EVIDENCE')) return;

    setIsProcessing(true);
    setUploadStep(1);

    let current = 1;
    const interval = setInterval(() => {
      current++;
      setUploadStep(current);
      if (current >= 7) {
        clearInterval(interval);
        setTimeout(() => {
          // Generate new evidence object
          const newId = `EVI-2026-${Math.floor(88105 + Math.random() * 900)}`;
          const generatedHash = `a${Math.floor(1000 + Math.random() * 9000)}b${Math.floor(1000 + Math.random() * 9000)}c${Math.floor(1000 + Math.random() * 9000)}d${Math.floor(1000 + Math.random() * 9000)}e3b0c44298fc1c149afbf4c8996fb924`;

          const createdEvidence = {
            id: newId,
            caseId: selectedCaseId,
            fileName: fileName,
            category: category,
            fileType: "application/pdf",
            fileSize: "6.4 MB",
            sha256Hash: generatedHash,
            md5Hash: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
            seizureDate: new Date().toISOString().replace('T', ' ').substring(0, 19) + " UTC",
            seizedBy: seizedBy,
            locationSeized: "Central Cyber Cell Laboratory Node-01",
            classification: "TOP_SECRET",
            integrityStatus: "VERIFIED",
            evidenceDNA: {
              exifSoftware: "SANCHARI Ingestion Gateway v2.4",
              deviceFingerprint: "DEV-MAC-99-88-77-66-55",
              sourceIp: "10.0.4.18",
              geoTag: "28.6139° N, 77.2090° E (New Delhi)",
              fileHeaderHex: "25 50 44 46 2D 31 2E 37",
              mimeSignature: "PDF Document Structure (Validated)",
              creationTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
            },
            aiAnalysis: {
              confidenceScore: 97.8,
              riskLevel: "HIGH",
              summary: "Newly ingested document analyzed. 12 financial transfer entities extracted with 97.8% AI confidence score.",
              extractedEntities: [
                { type: "ACCOUNT", text: "AC#88192-OFFSHORE", risk: "HIGH" },
                { type: "IP", text: "192.168.1.104", risk: "MEDIUM" }
              ],
              anomalies: ["Valid MIME header", "No timestamp corruption"]
            },
            tamperState: {
              isTampered: false,
              tamperedAt: null,
              tamperedByActor: null,
              originalHash: generatedHash,
              modifiedHash: generatedHash,
              diffChanges: []
            }
          };

          addUploadedEvidence(createdEvidence);
          setIsProcessing(false);
          setUploadStep(8); // Completed
        }, 500);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 bg-cyber-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-cyber-900 border border-cyan-500/40 rounded-2xl max-w-xl w-full p-6 shadow-cyber-glow space-y-6 text-left relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
            <Upload className="w-5 h-5 text-cyan-400" />
            <span>SECURE DIGITAL EVIDENCE INGESTION PIPELINE</span>
          </div>
          <button onClick={onClose} disabled={isProcessing} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {uploadStep === 0 && (
          <form onSubmit={handleStartIngestion} className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-slate-300 block mb-1">Target Case Docket:</label>
              <select 
                value={selectedCaseId} 
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full bg-cyber-950 border border-slate-700 rounded-lg p-2.5 text-slate-100"
              >
                {cases.map(c => (
                  <option key={c.id} value={c.id}>{c.id} - {c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Evidence File Name / Docket Name:</label>
              <input 
                type="text" 
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full bg-cyber-950 border border-slate-700 rounded-lg p-2.5 text-slate-100"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 block mb-1">Category:</label>
                <input 
                  type="text" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-cyber-950 border border-slate-700 rounded-lg p-2.5 text-slate-100"
                  required
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Seizing Officer / Custodian:</label>
                <input 
                  type="text" 
                  value={seizedBy}
                  onChange={(e) => setSeizedBy(e.target.value)}
                  className="w-full bg-cyber-950 border border-slate-700 rounded-lg p-2.5 text-slate-100"
                  required
                />
              </div>
            </div>

            <div className="bg-cyber-950 p-4 rounded-xl border border-dashed border-cyan-500/40 text-center space-y-2">
              <FileUp className="w-8 h-8 text-cyan-400 mx-auto animate-bounce" />
              <div className="text-slate-200 font-bold text-xs">Drag & drop seized file or click to browse</div>
              <div className="text-[10px] text-slate-500">Supports PDF, PCAP, DB, HEX, MP3, PNG, E01 Disk Images up to 2 GB</div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-cyber-glow flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Execute Ingestion Workflow</span>
              </button>
            </div>
          </form>
        )}

        {/* Live Processing Pipeline View */}
        {uploadStep >= 1 && uploadStep <= 7 && (
          <div className="space-y-4 font-mono text-xs">
            <div className="text-center space-y-1">
              <div className="text-cyan-400 font-bold">EXECUTING SECURE INGESTION WORKFLOW...</div>
              <div className="text-[11px] text-slate-400">Step {uploadStep} of 7: {pipelineSteps[uploadStep - 1].name}</div>
            </div>

            <div className="w-full bg-cyber-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full transition-all duration-300"
                style={{ width: `${(uploadStep / 7) * 100}%` }}
              ></div>
            </div>

            <div className="space-y-2 bg-cyber-950 p-3 rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
              {pipelineSteps.map((step, idx) => {
                const stepNum = idx + 1;
                const isDone = uploadStep > stepNum;
                const isCurrent = uploadStep === stepNum;
                return (
                  <div key={idx} className={`flex items-center justify-between p-2 rounded ${
                    isCurrent ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40' : 
                    isDone ? 'text-emerald-400' : 'text-slate-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : 
                       isCurrent ? <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div> :
                       <div className="w-3.5 h-3.5 rounded-full border border-slate-700"></div>}
                      <span className="font-bold">{step.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{step.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completion Step */}
        {uploadStep === 8 && (
          <div className="space-y-4 text-center font-mono text-xs py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
            <div className="text-slate-100 font-bold text-base">EVIDENCE SUCCESSFULLY INGESTED & REGISTERED!</div>
            <p className="text-slate-400 text-xs font-sans">
              File fingerprint, EXIF DNA, AI classification, and genesis blockchain block transaction have been registered.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-emerald-glow"
            >
              Close & View Evidence Repository
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
