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
      <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
        <h1>Option Data Management</h1>
        
        <OptionForm 
          recordToEdit={recordToEdit} 
          setRecordToEdit={setRecordToEdit} 
        />
        
        <OptionFilter />
        
        <OptionSummary />
        
        <div className="data-container">
          <h2>Option Data Records</h2>
          <OptionTable onEditRecord={setRecordToEdit} />
        </div>
      </div>
    </OptionProvider>
  );
}

export default App;