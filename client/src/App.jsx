import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import OptionsCrud from './pages/OptionsCrud';
import OptionForm from './components/OptionForm';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/option" element={<OptionsCrud />} />
      </Routes>
    </Router>
  );
}

export default App;