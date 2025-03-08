import React, { useState } from 'react';
import { useOption } from '../context/OptionContext';

const OptionFilter = () => {
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const { filterByTicker, filterByDate, fetchAllData } = useOption();

  // Handle filter value changes
  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  // Apply selected filter
  const handleApplyFilter = async () => {
    setIsFiltering(true);
    
    if (!filterValue) {
      await fetchAllData();
      setIsFiltering(false);
      return;
    }
    
    try {
      if (filterType === 'ticker') {
        await filterByTicker(filterValue);
      } else if (filterType === 'date') {
        await filterByDate(filterValue);
      }
      
      // Smooth scroll to results
      document.querySelector('.data-container').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } catch (error) {
      console.error('Filter error:', error);
    } finally {
      setIsFiltering(false);
    }
  };

  // Reset all filters
  const handleResetFilter = async () => {
    setFilterType('');
    setFilterValue('');
    setIsFiltering(true);
    await fetchAllData();
    setIsFiltering(false);
  };

  return (
    <div className="filter-container">
      <h2>Filter Data</h2>
      <div className="filter-controls">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="">Select Filter Type</option>
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
          className="filter-input"
        />
        
        <button 
          onClick={handleApplyFilter} 
          disabled={!filterType || !filterValue || isFiltering}
          className="filter-button"
        >
          {isFiltering ? (
            <>
              <span style={{ visibility: 'hidden' }}>Apply Filter</span>
              <span style={{ 
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
              }}>
                <span style={{ 
                  width: '16px', 
                  height: '16px', 
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}></span>
              </span>
            </>
          ) : (
            'Apply Filter'
          )}
        </button>
        
        <button 
          onClick={handleResetFilter}
          disabled={isFiltering}
          style={{ backgroundColor: '#6c757d' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default OptionFilter;