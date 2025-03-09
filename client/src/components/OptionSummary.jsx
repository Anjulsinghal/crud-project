import React from 'react';
import { useOption } from '../context/OptionContext';
import LoadingSpinner from './LoadingSpinner';

const OptionSummary = () => {
  const { summary, loading } = useOption();

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 mb-8 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden hover:before:opacity-100 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-primary before:to-secondary before:opacity-0 before:transition-opacity before:duration-300 summary-container animate-slideInRight animation-delay-200">
        <h2 className="text-dark font-bold mb-6 text-2xl relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:rounded after:scale-x-60 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
          Data Summary
        </h2>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-light rounded-xl p-8 mb-8 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden hover:before:opacity-100 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-primary before:to-secondary before:opacity-0 before:transition-opacity before:duration-300 summary-container animate-slideInRight animation-delay-200">
      <h2 className="text-dark font-bold mb-6 text-2xl relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:rounded after:scale-x-60 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
        Data Summary
      </h2>
      {summary ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 bg-secondary/8 p-6 rounded-lg border-l-4 border-secondary transition-all duration-300 hover:bg-secondary/12 hover:-translate-y-1">
          <div>
            <strong className="block text-gray-700 mb-1 text-sm">Total Open</strong>
            <span className="text-base">{summary.totalOpen.toFixed(2)}</span>
          </div>
          <div>
            <strong className="block text-gray-700 mb-1 text-sm">Total High</strong>
            <span className="text-base">{summary.totalHigh.toFixed(2)}</span>
          </div>
          <div>
            <strong className="block text-gray-700 mb-1 text-sm">Total Low</strong>
            <span className="text-base">{summary.totalLow.toFixed(2)}</span>
          </div>
          <div>
            <strong className="block text-gray-700 mb-1 text-sm">Total Close</strong>
            <span className="text-base">{summary.totalClose.toFixed(2)}</span>
          </div>
          <div>
            <strong className="block text-gray-700 mb-1 text-sm">Record Count</strong>
            <span className="text-base">{summary.recordCount}</span>
          </div>
        </div>
      ) : (
        <p className="text-center p-8 bg-light rounded-lg text-gray-600 font-medium">No summary data available</p>
      )}
    </div>
  );
};

export default OptionSummary;