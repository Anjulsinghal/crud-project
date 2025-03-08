  import React from 'react';
  import { useOption } from '../context/OptionContext';

  const OptionTable = ({ onEditRecord }) => {
    const { optionData, loading, error, deleteRecord } = useOption();

    if (loading) {
      return <p>Loading data...</p>;
    }

    if (error) {
      return <p className="error-message">{error}</p>;
    }

    if (!optionData.length) {
      return <p>No records found</p>;
    }

    return (
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
          {optionData.map((data) => (
            <tr key={data._id}>
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
                <button onClick={() => onEditRecord(data)}>Edit</button>
                <button onClick={() => deleteRecord(data._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  export default OptionTable;