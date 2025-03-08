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
    return <p className="error-message">{error}</p>;
  }

  if (!optionData.length) {
    return <p>No records found</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Date</th>
            <th>Time</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
            <th>OI</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {optionData.map((data, index) => (
            <tr 
              key={data._id}
              style={{
                animation: `fadeIn 0.3s ease forwards ${index * 0.05}s`,
                opacity: 0,
                transform: 'translateY(10px)',
                background: deletingId === data._id ? '#ffebee' : 'transparent'
              }}
            >
              <td>{data.Ticker}</td>
              <td>{data.Date}</td>
              <td>{data.Time}</td>
              <td>{data.Open}</td>
              <td>{data.High}</td>
              <td>{data.Low}</td>
              <td>{data.Close}</td>
              <td>{data.Volume}</td>
              <td>{data.OI}</td>
              <td>
                <button 
                  onClick={() => onEditRecord(data)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(data._id)}
                  className="delete-button"
                  disabled={deletingId === data._id}
                >
                  {deletingId === data._id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OptionTable;