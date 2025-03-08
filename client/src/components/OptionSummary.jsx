import React from 'react';
import { useOption } from '../context/OptionContext';
import LoadingSpinner from './LoadingSpinner';

const OptionSummary = () => {
  const { summary, loading } = useOption();

  if (loading) {
    return (
      <div className="summary-container">
        <h2>Data Summary</h2>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="summary-container">
      <h2>Data Summary</h2>
      {summary ? (
        <div className="summary-box">
          <div className="summary-item">
            <strong>Total Open</strong>
            <span className="summary-value">{summary.totalOpen.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <strong>Total High</strong>
            <span className="summary-value">{summary.totalHigh.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <strong>Total Low</strong>
            <span className="summary-value">{summary.totalLow.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <strong>Total Close</strong>
            <span className="summary-value">{summary.totalClose.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <strong>Record Count</strong>
            <span className="summary-value">{summary.recordCount}</span>
          </div>
        </div>
      ) : (
        <p>No summary data available</p>
      )}
    </div>
  );
};

export default OptionSummary;