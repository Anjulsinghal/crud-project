import React from 'react';
import { useOption } from '../context/OptionContext';
import LoadingSpinner from './LoadingSpinner';

const OptionSummary = () => {
  const { summary, loading } = useOption();

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 mb-8 shadow-lg card-hover summary-container animate-slideInRight animate-delayed">
        <h2 className="text-dark font-bold mb-6 text-2xl relative inline-block">
          Data Summary
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary rounded scale-x-60 origin-left transition-transform duration-300"></span>
        </h2>
        <LoadingSpinner />
      </div>
    );
  }

  const summaryItems = [
    { label: "Total Open", value: summary?.totalOpen },
    { label: "Total High", value: summary?.totalHigh },
    { label: "Total Low", value: summary?.totalLow },
    { label: "Total Close", value: summary?.totalClose },
    { label: "Record Count", value: summary?.recordCount }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-light rounded-xl p-8 mb-8 shadow-lg card-hover neumorphic summary-container animate-slideInRight animate-delayed">
      <h2 className="text-dark font-bold mb-6 text-2xl relative inline-block">
        Data Summary
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary rounded scale-x-60 origin-left transition-transform duration-300"></span>
      </h2>
      {summary ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 bg-white/50 p-6 rounded-lg border-l-4 border-secondary transition-all duration-300 hover:bg-white/80 hover:-translate-y-1">
          {summaryItems.map(item => (
            <div key={item.label}>
              <strong className="block text-gray-700 mb-1 text-sm">{item.label}</strong>
              <span className="text-base font-medium">
                {typeof item.value === 'number' && item.label !== 'Record Count' 
                  ? item.value.toFixed(2) 
                  : item.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center p-8 bg-light rounded-lg text-gray-600 font-medium">No summary data available</p>
      )}
    </div>
  );
};

export default OptionSummary;