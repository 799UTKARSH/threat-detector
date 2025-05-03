import React from 'react';
import './scanner.css';

const ScannerResult = ({ result }) => {
  if (!result) return null;

  return (
    <div className={`scan-result ${result.action}`}>
      <h3>Scan Result: {result.action.toUpperCase()}</h3>
      <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
      {result.message && <p>{result.message}</p>}
      {result.details && (
        <div className="features">
          <h4>Details:</h4>
          <pre>{JSON.stringify(result.details, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ScannerResult;