import React from 'react';
import { useScan } from '../context/ScanContext';
import './scanhistory.css';

const ScanHistory = () => {
  const { scanHistory } = useScan();

  const getActionClass = (action) => {
    switch (action) {
      case 'block': return 'blocked';
      case 'flag': return 'flagged';
      case 'log': return 'logged';
      default: return 'allowed';
    }
  };

  return (
    <div className="scan-history">
      <h2>Scan History</h2>
      
      {scanHistory.length === 0 ? (
        <p>No scan history available</p>
      ) : (
        <div className="history-table">
          <div className="table-header">
            <div>Type</div>
            <div>Content</div>
            <div>Result</div>
            <div>Confidence</div>
            <div>Date</div>
          </div>
          
          {scanHistory.map((scan, index) => (
            <div key={index} className="table-row">
              <div>{scan.type}</div>
              <div className="content-cell">{scan.content}</div>
              <div className={`result-cell ${getActionClass(scan.result?.action)}`}>
                {scan.result?.action || 'N/A'}
              </div>
              <div>
                {scan.result?.confidence ? `${(scan.result.confidence * 100).toFixed(2)}%` : 'N/A'}
              </div>
              <div>{new Date(scan.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScanHistory;