import React from 'react';
import { useOption } from '../context/OptionContext';
import LoadingSpinner from './LoadingSpinner';

const OptionSummary = () => {
  const { summary, loading } = useOption();

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 mb-8 shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] summary-container animate-slideInRight animate-delayed relative group">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#1e3a8a] transform origin-left transition-transform scale-x-100"></div>
        <h2 className="text-[#1e3a8a] font-bold mb-6 text-2xl relative inline-block group-hover:text-[#2563eb]">
          Data Summary
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#2563eb] rounded scale-x-60 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </h2>
        <LoadingSpinner />
      </div>
    );
  }

  const summaryItems = [
    { label: "Total Open", value: summary?.totalOpen, icon: "📈" },
    { label: "Total High", value: summary?.totalHigh, icon: "🔼" },
    { label: "Total Low", value: summary?.totalLow, icon: "🔽" },
    { label: "Total Close", value: summary?.totalClose, icon: "📉" },
    { label: "Record Count", value: summary?.recordCount, icon: "📊" }
  ];

  return (
    <div className="bg-white rounded-xl p-8 mb-8 shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] summary-container animate-slideInRight animate-delayed relative group">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#1e3a8a] transform origin-left transition-transform scale-x-100"></div>
      <h2 className="text-[#1e3a8a] font-bold mb-6 text-2xl relative inline-block group-hover:text-[#2563eb]">
        Data Summary
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#2563eb] rounded scale-x-60 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
      </h2>
      {summary ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 bg-[#f8fafc] p-6 rounded-lg border-l-4 border-[#2563eb] transition-all duration-300 hover:bg-white hover:-translate-y-1">
          {summaryItems.map(item => (
            <div key={item.label} className="transition-all duration-300 hover:-translate-y-1 p-3 rounded-lg hover:bg-[#f1f5f9]">
              <strong className="block text-[#1e3a8a] mb-1 text-sm flex items-center">
                <span className="mr-2">{item.icon}</span> {item.label}
              </strong>
              <span className="text-base font-medium text-[#2563eb]">
                {typeof item.value === 'number' && item.label !== 'Record Count' 
                  ? item.value.toFixed(2) 
                  : item.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center p-8 bg-[#f8fafc] rounded-lg text-gray-600 font-medium">No summary data available</p>
      )}
    </div>
  );
};

export default OptionSummary;