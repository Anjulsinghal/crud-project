import React, { useEffect, useState } from 'react'

import OptionForm from '../components/OptionForm';
import OptionFilter from '../components/OptionFilter';
import OptionSummary from '../components/OptionSummary';
import OptionTable from '../components/OptionTable';

const OptionsCrud = () => {
    const [recordToEdit, setRecordToEdit] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
    
      useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 200);
        return () => clearTimeout(timer);
      }, []);
  return (
    <div className={`max-w-[1200px] mx-auto my-8 px-5 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-center text-dark text-[2.5rem] font-extrabold tracking-[-0.5px] mb-8 relative pb-3 gradient-text">
          Option Data Management
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-1 bg-primary rounded-[2px]"></span>
        </h1>
        
        <OptionForm 
          recordToEdit={recordToEdit} 
          setRecordToEdit={setRecordToEdit} 
        />
        
        <OptionFilter />
        
        <OptionSummary />
        
        <div className="bg-white rounded-[12px] p-8 mb-8 shadow-lg card-hover relative overflow-hidden data-container">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          <h2 className="text-dark font-bold mb-6 text-2xl relative inline-block">
            Option Data Records
            <span className="absolute bottom-[-5px] left-0 w-full h-[3px] bg-secondary rounded-[3px] transform origin-left transition-transform duration-300 scale-x-[0.6] group-hover:scale-x-100"></span>
          </h2>
          <OptionTable onEditRecord={setRecordToEdit} />
        </div>
      </div>
  )
}

export default OptionsCrud;