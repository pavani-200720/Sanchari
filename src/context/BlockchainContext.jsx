import React, { createContext, useContext, useState } from 'react';
import { MOCK_BLOCKCHAIN } from '../data/mockBlockchain';

const BlockchainContext = createContext();

export function BlockchainProvider({ children }) {
  const [blocks, setBlocks] = useState(MOCK_BLOCKCHAIN);
  const [isVerifying, setIsVerifying] = useState(false);
  const [lastVerificationResult, setLastVerificationResult] = useState(null);

  const runIntegrityCheck = (evidenceHash) => {
    setIsVerifying(true);
    setLastVerificationResult(null);

    setTimeout(() => {
      const genesisBlock = blocks.find(b => 
        b.transactions.some(tx => tx.hash === evidenceHash)
      );

      setIsVerifying(false);
      if (genesisBlock) {
        setLastVerificationResult({
          status: "VERIFIED_ON_CHAIN",
          blockIndex: genesisBlock.blockIndex,
          timestamp: genesisBlock.timestamp,
          validatorNode: genesisBlock.validatorNode,
          merkleRoot: genesisBlock.merkleRoot
        });
      } else {
        setLastVerificationResult({
          status: "TAMPER_ALERT",
          message: "Calculated hash does not match genesis transaction hash recorded on chain!"
        });
      }
    }, 800);
  };

  return (
    <BlockchainContext.Provider value={{
      blocks,
      isVerifying,
      lastVerificationResult,
      runIntegrityCheck
    }}>
      {children}
    </BlockchainContext.Provider>
  );
}

export function useBlockchain() {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
}
