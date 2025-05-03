import React, {  useEffect } from 'react';
import { ScanContext } from '../context/ScanContext';
import ScanHistory from '../components/ScanHistory';
import '../styles/dashboard.css';
import { useAuth } from '../context/AuthContext';
import { useScan } from '../context/ScanContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { scanHistory, getHistory } = useScan();

  useEffect(() => {
    if (currentUser) {
      getHistory();
    }
  }, [currentUser, getHistory]);

  return (
    <div className="dashboard">
      <h1>Welcome, {currentUser?.username}</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Scans</h3>
          <p>{scanHistory.length}</p>
        </div>
        <div className="stat-card">
          <h3>Threats Detected</h3>
          <p>{scanHistory.filter(scan => scan.result.action !== 'allow').length}</p>
        </div>
      </div>
      
      <ScanHistory />
    </div>
  );
};

export default Dashboard;