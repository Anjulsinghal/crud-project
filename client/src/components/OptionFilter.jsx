import React, { useState } from 'react';
import { useOption } from '../context/OptionContext';

const OptionFilter = () => {
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const { filterByTicker, filterByDate, fetchAllData } = useOption();

  const handleFilterChange = (e) => setFilterValue(e.target.value);

  const handleApplyFilter = async () => {
    setIsFiltering(true);
    
    try {
      if (!filterValue) {
        await fetchAllData();
      } else if (filterType === 'ticker') {
        await filterByTicker(filterValue);
      } else if (filterType === 'date') {
        await filterByDate(filterValue);
      }
      
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

  const handleResetFilter = async () => {
    setFilterType('');
    setFilterValue('');
    setIsFiltering(true);
    await fetchAllData();
    setIsFiltering(false);
  };

  return (
    <div className="bg-white rounded-xl p-8 mb-8 shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] animate-slideInLeft group relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#1e3a8a] transform origin-left transition-transform scale-x-100"></div>
      <h2 className="text-[#1e3a8a] font-bold mb-6 text-2xl relative inline-block group-hover:text-[#2563eb]">
        Filter Data
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#2563eb] rounded scale-x-60 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
      </h2>
      <div className="flex gap-4 items-center flex-wrap mb-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full flex-1 min-w-[150px] p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-white hover:border-[#2563eb] focus:outline-none focus:border-[#1e3a8a] focus:ring-3 focus:ring-[#1e3a8a]/15"
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
          className="w-full flex-1 min-w-[150px] p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-white hover:border-[#2563eb] focus:outline-none focus:border-[#1e3a8a] focus:ring-3 focus:ring-[#1e3a8a]/15 disabled:bg-gray-100 disabled:text-gray-400"
        />
        
        <button 
          onClick={handleApplyFilter} 
          disabled={!filterType || !filterValue || isFiltering}
          className="bg-[#1e3a8a] text-white py-3 px-6 mr-4 rounded-lg text-sm font-semibold transition-all duration-300 inline-flex items-center justify-center hover:bg-[#2563eb] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:bg-gray-200 disabled:text-gray-500"
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
          className="bg-gray-500 text-white py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 inline-flex items-center justify-center hover:bg-gray-600 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:bg-gray-200 disabled:text-gray-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default OptionFilter;