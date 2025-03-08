import React, { useState } from 'react';
import { OptionProvider } from './context/OptionContext';
import OptionForm from './components/OptionForm';
import OptionFilter from './components/OptionFilter';
import OptionSummary from './components/OptionSummary';
import OptionTable from './components/OptionTable';
import './App.css';

function App() {
  const [recordToEdit, setRecordToEdit] = useState(null);

  return (
    <OptionProvider>
      <div className="app-container">
        <h1>Option Data CRUD Application</h1>
        
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