import React from 'react';
import { useOption } from '../context/OptionContext';

const OptionSummary = () => {
  const { summary, loading } = useOption();

  if (loading) {
    return (
      <div className="summary-container">
        <h2>Data Summary</h2>
        <p>Loading summary data...</p>
      </div>
    );
  }

  return (
    <div className="summary-container">
      <h2>Data Summary</h2>
      {summary ? (
        <div className="summary-box">
          <p><strong>Total Open:</strong> {summary.totalOpen.toFixed(2)}</p>
          <p><strong>Total High:</strong> {summary.totalHigh.toFixed(2)}</p>
          <p><strong>Total Low:</strong> {summary.totalLow.toFixed(2)}</p>
          <p><strong>Total Close:</strong> {summary.totalClose.toFixed(2)}</p>
          <p><strong>Record Count:</strong> {summary.recordCount}</p>
        </div>
      ) : (
        <p>No summary data available</p>
      )}
    </div>
  );
};

export default OptionSummary;