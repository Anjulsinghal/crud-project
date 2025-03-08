import React, { useState } from 'react';
import { useOption } from '../context/OptionContext';

const OptionFilter = () => {
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const { filterByTicker, filterByDate, fetchAllData } = useOption();

  // Handle filter value changes
  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  // Apply selected filter
  const handleApplyFilter = async () => {
    if (!filterValue) {
      fetchAllData();
      return;
    }
    
    if (filterType === 'ticker') {
      await filterByTicker(filterValue);
    } else if (filterType === 'date') {
      await filterByDate(filterValue);
    }
  };

  // Reset all filters
  const handleResetFilter = () => {
    setFilterType('');
    setFilterValue('');
    fetchAllData();
  };

  return (
    <div className="filter-container">
      <h2>Filter Data</h2>
      <div className="filter-controls">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Select Filter</option>
          <option value="ticker">By Ticker</option>
          <option value="date">By Date</option>
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={handleFilterChange}
          placeholder={
            filterType === 'ticker'
              ? 'Enter ticker symbol'
              : filterType === 'date'
              ? 'Enter date (YYYYMMDD)'
              : 'Select filter type first'
          }
          disabled={!filterType}
        />
        <button onClick={handleApplyFilter} disabled={!filterType || !filterValue}>
          Apply Filter
        </button>
        <button onClick={handleResetFilter}>Reset</button>
      </div>
    </div>
  );
};

export default OptionFilter;