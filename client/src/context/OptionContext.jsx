import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/options';

// Create context
const OptionContext = createContext();

// Provider component
export const OptionProvider = ({ children }) => {
  const [optionData, setOptionData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all data
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setOptionData(response.data);
    } catch (error) {
      setError('Error fetching data: ' + error.message);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch summary data
  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/summary`);
      setSummary(response.data);
    } catch (error) {
      setError('Error fetching summary: ' + error.message);
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new record
  const createRecord = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_URL, formData);
      setOptionData([...optionData, response.data]);
      fetchSummary(); // Update summary after creating
      return response.data;
    } catch (error) {
      setError('Error creating record: ' + error.message);
      console.error('Error creating record:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update a record
  const updateRecord = async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData);
      setOptionData(
        optionData.map((item) => (item._id === id ? response.data : item))
      );
      fetchSummary(); // Update summary after updating
      return response.data;
    } catch (error) {
      setError('Error updating record: ' + error.message);
      console.error('Error updating record:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a record
  const deleteRecord = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setOptionData(optionData.filter((item) => item._id !== id));
      fetchSummary(); // Update summary after deleting
    } catch (error) {
      setError('Error deleting record: ' + error.message);
      console.error('Error deleting record:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Filter by ticker
  const filterByTicker = async (ticker) => {
    setLoading(true);
    setError(null);
    try {
      if (!ticker) {
        return fetchAllData();
      }
      const response = await axios.get(`${API_URL}/ticker/${ticker}`);
      setOptionData(response.data);
    } catch (error) {
      setError('Error filtering by ticker: ' + error.message);
      console.error('Error filtering by ticker:', error);
      setOptionData([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter by date
  const filterByDate = async (date) => {
    setLoading(true);
    setError(null);
    try {
      if (!date) {
        return fetchAllData();
      }
      const response = await axios.get(`${API_URL}/date/${date}`);
      setOptionData(response.data);
    } catch (error) {
      setError('Error filtering by date: ' + error.message);
      console.error('Error filtering by date:', error);
      setOptionData([]);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchAllData();
    fetchSummary();
  }, []);

  return (
    <OptionContext.Provider
      value={{
        optionData,
        summary,
        loading,
        error,
        fetchAllData,
        fetchSummary,
        createRecord,
        updateRecord,
        deleteRecord,
        filterByTicker,
        filterByDate
      }}
    >
      {children}
    </OptionContext.Provider>
  );
};

// Custom hook to use the option context
export const useOption = () => {
  const context = useContext(OptionContext);
  if (!context) {
    throw new Error('useOption must be used within an OptionProvider');
  }
  return context;
};