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
    <div className="bg-white rounded-xl p-8 mb-8 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden hover:before:opacity-100 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-primary before:to-secondary before:opacity-0 before:transition-opacity before:duration-300 animate-slideInLeft animation-delay-100">
      <h2 className="text-dark font-bold mb-6 text-2xl relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:rounded after:scale-x-60 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
        Filter Data
      </h2>
      <div className="flex gap-4 items-center flex-wrap mb-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full flex-1 min-w-[150px] p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-light hover:border-gray-400 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
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
          className="w-full flex-1 min-w-[150px] p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-light hover:border-gray-400 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        />
        
        <button 
          onClick={handleApplyFilter} 
          disabled={!filterType || !filterValue || isFiltering}
          className="bg-primary text-white border-none py-3 px-6 mr-4 rounded-lg cursor-pointer text-sm font-semibold transition-all duration-300 inline-flex items-center justify-center hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none relative overflow-hidden"
        >
          {isFiltering ? (
            <>
              <span className="invisible">Apply Filter</span>
              <span className="absolute flex items-center justify-center w-full h-full">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              </span>
            </>
          ) : (
            'Apply Filter'
          )}
        </button>
        
        <button 
          onClick={handleResetFilter}
          disabled={isFiltering}
          className="bg-gray-500 text-white border-none py-3 px-6 rounded-lg cursor-pointer text-sm font-semibold transition-all duration-300 inline-flex items-center justify-center hover:bg-gray-600 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default OptionFilter;