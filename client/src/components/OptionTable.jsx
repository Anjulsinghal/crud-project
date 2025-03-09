import React, { useState } from 'react';
import { useOption } from '../context/OptionContext';
import LoadingSpinner from './LoadingSpinner';

const OptionTable = ({ onEditRecord }) => {
  const { optionData, loading, error, deleteRecord } = useOption();
  const [deletingId, setDeletingId] = useState(null);

  // Handle delete with confirmation and animation
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-danger bg-danger/10 p-4 rounded-lg my-4 animate-shake">{error}</p>;
  }

  if (!optionData.length) {
    return <p className="text-center py-8 bg-gray-50 rounded-lg text-gray-600 font-medium">No records found</p>;
  }

  // OptionTable.jsx return function
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-danger bg-[rgba(230,57,70,0.1)] p-4 rounded-lg my-4 animate-[shake_0.5s_ease-in-out]">{error}</p>
      ) : !optionData.length ? (
        <p className="text-center py-8 bg-[#f8f9fa] rounded-[10px] text-[#666] font-medium">No records found</p>
      ) : (
        <table className="w-full border-separate border-spacing-0 mt-6 rounded-[10px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
          <thead>
            <tr>
              <th className="p-4 text-left border-b border-[#eee] bg-[#f8f9fa] font-semibold text-[#333] sticky top-0 z-10">Ticker</th>
              <th className="p-4 text-left border-b border-[#eee] bg-[#f8f9fa] font-semibold text-[#333] sticky top-0 z-10">Date</th>
              <th className="p-4 text-left border-b border-[#eee] bg-[#f8f9fa] font-semibold text-[#333] sticky top-0 z-10">Time</th>
              <th className="p-4 text-left border-b border-[#eee] bg-[#f8f9fa] font-semibold text-[#333] sticky top-0 z-10">Open</th>
              <th className="p-4 text-left border-b border-[#eee] bg-[#f8f9fa] font-semibold text-[#333] sticky top-0 z-10">High</th>
              <th className="p-4 text-left border-b border-[#eee] bg-[#f8f9fa] font-semibold text-[#333] sticky top-0 z-10">Low</th>
              <th className="p-4 text-left border-b border-[#eee] bg-[#f8f9fa] font-semibold text-[#333] sticky top-0 z-10">Close</th>
              <th className="p-4 text-left border-b border-[#eee] bg-[#f8f9fa] font-semibold text-[#333] sticky top-0 z-10">Volume</th>
              <th className="p-4 text-left border-b border-[#eee] bg-[#f8f9fa] font-semibold text-[#333] sticky top-0 z-10">OI</th>
              <th className="p-4 text-left border-b border-[#eee] bg-[#f8f9fa] font-semibold text-[#333] sticky top-0 z-10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {optionData.map((data, index) => (
              <tr
                key={data._id}
                className="transition-all duration-300 ease-in hover:bg-[#f8f9fa]"
                style={{
                  animation: `fadeIn 0.3s ease forwards ${index * 0.05}s`,
                  opacity: 0,
                  transform: 'translateY(10px)',
                  backgroundColor: deletingId === data._id ? '#ffebee' : 'transparent'
                }}
              >
                <td className="p-4 border-b border-[#eee]">{data.Ticker}</td>
                <td className="p-4 border-b border-[#eee]">{data.Date}</td>
                <td className="p-4 border-b border-[#eee]">{data.Time}</td>
                <td className="p-4 border-b border-[#eee]">{data.Open}</td>
                <td className="p-4 border-b border-[#eee]">{data.High}</td>
                <td className="p-4 border-b border-[#eee]">{data.Low}</td>
                <td className="p-4 border-b border-[#eee]">{data.Close}</td>
                <td className="p-4 border-b border-[#eee]">{data.Volume}</td>
                <td className="p-4 border-b border-[#eee]">{data.OI}</td>
                <td className="p-4 border-b border-[#eee]">
                  <button
                    onClick={() => onEditRecord(data)}
                    className="bg-[#2ec4b6] text-white border-none py-2 px-3 mr-2 rounded-md cursor-pointer text-sm font-semibold transition-all duration-300 ease-in hover:bg-[#25a89d]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="bg-[#e63946] text-white border-none py-2 px-3 rounded-md cursor-pointer text-sm font-semibold transition-all duration-300 ease-in hover:bg-[#d32f3b] disabled:bg-[#ffcdd2] disabled:text-[#d32f3b] disabled:cursor-not-allowed"
                    disabled={deletingId === data._id}
                  >
                    {deletingId === data._id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OptionTable;