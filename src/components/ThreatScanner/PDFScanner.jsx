import React, { useState } from 'react';
import { useScan } from '../../context/ScanContext';
import './scanner.css';

const PDFScanner = ({ onScanComplete }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { scanPdf } = useScan();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleScan = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const result = await scanPdf(file);
      onScanComplete(result);
    } catch (error) {
      onScanComplete({ 
        action: 'error', 
        message: 'Failed to scan PDF',
        confidence: 0
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scanner-container">
      <h2>PDF Scanner</h2>
      <div className="scanner-input">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
        <button onClick={handleScan} disabled={!file || loading}>
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </div>
    </div>
  );
};

export default PDFScanner;