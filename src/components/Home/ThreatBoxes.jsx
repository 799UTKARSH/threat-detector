import React, { useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/threat-boxes.css';

const ThreatBoxes = () => {
  const { currentUser } = useAuth();
  const [scanCount, setScanCount] = useState(0);
  const navigate = useNavigate();

  const handleScanClick = (type) => {
    if (!currentUser && scanCount >= 3) {
      return; // Don't allow more scans for unauthenticated users
    }
    setScanCount(prev => prev + 1);
    navigate(`/scanner?type=${type}`);
  };

  return (
    <div className="threat-boxes-container">
      <div className="threat-box" onClick={() => handleScanClick('url')}>
        <div className="threat-icon">
          <i className="fas fa-link"></i>
        </div>
        <h3>URL Scanner</h3>
        <p>Detect phishing and malicious URLs</p>
        {!currentUser && (
          <div className="scan-counter">Free Trial: {Math.max(0, 3 - scanCount)}</div>
        )}
      </div>
      
      <div className="threat-box" onClick={() => handleScanClick('ip')}>
        <div className="threat-icon">
          <i className="fas fa-network-wired"></i>
        </div>
        <h3>IP Scanner</h3>
        <p>Identify suspicious IP addresses</p>
        {!currentUser && (
          <div className="scan-counter">Free Trial: {Math.max(0, 3 - scanCount)}</div>
        )}
      </div>
      
      <div className="threat-box" onClick={() => handleScanClick('pdf')}>
        <div className="threat-icon">
          <i className="fas fa-file-pdf"></i>
        </div>
        <h3>PDF Scanner</h3>
        <p>Analyze PDF files for malware</p>
        {!currentUser && (
          <div className="scan-counter">Free Trial: {Math.max(0, 3 - scanCount)}</div>
        )}
      </div>
    </div>
  );
};

export default ThreatBoxes;