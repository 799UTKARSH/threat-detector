import React, { createContext, useState, useContext } from 'react';
import scanService from '../services/scanService';
import { useAuth } from './AuthContext';


const ScanContext = createContext();

export const ScanProvider = ({ children }) => {
  
  const [scanCount, setScanCount] = useState(0);
  const [scanHistory, setScanHistory] = useState([]);
  const { currentUser } = useAuth();

  const scanUrl = async (url) => {
    const response = await scanService.scanUrl(url);
    setScanCount(prev => prev + 1);
    if (currentUser) {
      // Add to history if logged in
      setScanHistory(prev => [...prev, { type: 'url', content: url, result: response }]);
    }
    return response;
  };

  const scanIp = async (ip) => {
    const response = await scanService.scanIp(ip);
    setScanCount(prev => prev + 1);
    if (currentUser) {
      setScanHistory(prev => [...prev, { type: 'ip', content: ip, result: response }]);
    }
    return response;
  };

  const scanPdf = async (file) => {
    const response = await scanService.scanPdf(file);
    setScanCount(prev => prev + 1);
    if (currentUser) {
      setScanHistory(prev => [...prev, { type: 'pdf', content: file.name, result: response }]);
    }
    return response;
  };

  const getHistory = async () => {
    if (currentUser) {
      const history = await scanService.getHistory();
      setScanHistory(history);
      return history;
    }
    return [];
  };

  return (
    <ScanContext.Provider value={{ 
      scanCount, 
      scanHistory, 
      scanUrl, 
      scanIp, 
      scanPdf, 
      getHistory 
    }}>
      {children}
    </ScanContext.Provider>
  );
};
export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScan must be used within a ScanProvider');
  }
  return context;
};

export default ScanContext;