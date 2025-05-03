import React, { useState } from 'react';
import { useScan } from '../../context/ScanContext';
import './scanner.css';

const IPScanner = ({ onScanComplete }) => {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const { scanIp } = useScan();

  const handleScan = async () => {
    if (!ip) return;
    
    setLoading(true);
    try {
      const result = await scanIp(ip);
      onScanComplete(result);
    } catch (error) {
      onScanComplete({ 
        action: 'error', 
        message: 'Failed to scan IP',
        confidence: 0
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scanner-container">
      <h2>IP Scanner</h2>
      <div className="scanner-input">
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter IP address to scan"
        />
        <button onClick={handleScan} disabled={loading}>
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </div>
    </div>
  );
};

export default IPScanner;