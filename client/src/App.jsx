import React, { useState, useEffect } from 'react';
import { OptionProvider } from './context/OptionContext';
import OptionForm from './components/OptionForm';
import OptionFilter from './components/OptionFilter';
import OptionSummary from './components/OptionSummary';
import OptionTable from './components/OptionTable';
import './App.css';

function App() {
  const [recordToEdit, setRecordToEdit] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Add fade-in animation after initial load
  useEffect(() => {
    // Set a timeout to simulate app loading and trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <OptionProvider>
      <div className={`max-w-[1200px] mx-auto my-8 px-5 animate-[fadeIn_0.5s_ease-in-out] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-center text-dark text-[2.5rem] font-extrabold tracking-[-0.5px] mb-8 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-1 after:bg-primary after:rounded-[2px]">
          Option Data Management
        </h1>
        
        <OptionForm 
          recordToEdit={recordToEdit} 
          setRecordToEdit={setRecordToEdit} 
        />
        
        <OptionFilter />
        
        <OptionSummary />
        
        <div className="bg-white rounded-[12px] p-8 mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in hover:translate-y-[-5px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-primary before:to-secondary before:opacity-0 before:transition-all before:duration-300 before:ease-in hover:before:opacity-100 animate-[slideInLeft_0.6s_ease-out_0.3s_backwards]">
          <h2 className="text-dark font-bold mb-6 text-2xl relative inline-block after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[3px] after:bg-secondary after:rounded-[3px] after:scale-x-[0.6] after:transform-origin-left after:transition-all after:duration-300 after:ease-in group-hover:after:scale-x-100">
            Option Data Records
          </h2>
          <OptionTable onEditRecord={setRecordToEdit} />
        </div>
      </div>
    </OptionProvider>
  );
}

export default App;