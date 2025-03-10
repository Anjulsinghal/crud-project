import React, { useState } from 'react';
import { useOption } from '../context/OptionContext';
import LoadingSpinner from './LoadingSpinner';

const OptionTable = ({ onEditRecord }) => {
  const { optionData, loading, error, deleteRecord } = useOption();
  const [deletingId, setDeletingId] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);

    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteRecord(id);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }

    setDeletingId(null);
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return <p className="text-red-600 bg-red-100 p-4 rounded-lg my-4 animate-shake">{error}</p>;
  }

  if (!optionData.length) {
    return <p className="text-center py-8 bg-[#f8fafc] rounded-lg text-gray-600 font-medium">No records found</p>;
  }

  const tableHeaders = ["Ticker", "Date", "Time", "Open", "High", "Low", "Close", "Volume", "OI", "Actions"];

  return (
    <div className="overflow-x-auto table-wrapper">
      <table className="w-full border-separate border-spacing-0 mt-6 overflow-hidden shadow-lg">
        <thead>
          <tr>
            {tableHeaders.map(header => (
              <th key={header} className="p-4 text-left border-b border-gray-200 bg-[#f8fafc] font-semibold text-[#1e3a8a] sticky top-0 z-10">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {optionData.map((data, index) => (
            <tr
              key={data._id}
              className="transition-all duration-300 hover:bg-[#f1f5f9]"
              style={{
                animation: `fadeIn 0.3s ease forwards ${index * 0.05}s`,
                opacity: 0,
                transform: 'translateY(10px)',
                backgroundColor: deletingId === data._id ? '#fee2e2' : hoveredRow === data._id ? '#f1f5f9' : 'transparent'
              }}
              onMouseEnter={() => setHoveredRow(data._id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td className="p-4 border-b border-gray-100 font-medium text-[#1e3a8a]">{data.Ticker}</td>
              <td className="p-4 border-b border-gray-100">{data.Date}</td>
              <td className="p-4 border-b border-gray-100">{data.Time}</td>
              <td className="p-4 border-b border-gray-100">{data.Open}</td>
              <td className="p-4 border-b border-gray-100">{data.High}</td>
              <td className="p-4 border-b border-gray-100">{data.Low}</td>
              <td className="p-4 border-b border-gray-100">{data.Close}</td>
              <td className="p-4 border-b border-gray-100">{data.Volume}</td>
              <td className="p-4 border-b border-gray-100">{data.OI}</td>
              <td className="p-4 border-b border-gray-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEditRecord(data)}
                    className="bg-[#2563eb] text-white border-none py-2 px-3 rounded-md text-sm font-semibold transition-all duration-300 hover:bg-opacity-80 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="bg-red-500 text-white border-none py-2 px-3 rounded-md text-sm font-semibold transition-all duration-300 hover:bg-opacity-80 hover:-translate-y-0.5 hover:shadow-md disabled:bg-opacity-50 disabled:transform-none disabled:shadow-none"
                    disabled={deletingId === data._id}
                  >
                    {deletingId === data._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OptionTable;