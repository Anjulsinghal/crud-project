import React, { useState, useEffect } from 'react';
import { useOption } from '../context/OptionContext';

const initialFormState = {
  Ticker: '',
  Date: '',
  Time: '',
  Open: '',
  High: '',
  Low: '',
  Close: '',
  Volume: '',
  OI: ''
};

const OptionForm = ({ recordToEdit, setRecordToEdit }) => {
  const [formData, setFormData] = useState(initialFormState);
  const { createRecord, updateRecord } = useOption();

  // Set form data when a record is selected for editing
  useEffect(() => {
    if (recordToEdit) {
      setFormData(recordToEdit);
    } else {
      setFormData(initialFormState);
    }
  }, [recordToEdit]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'Ticker' || name === 'Date' || name === 'Time' 
        ? value 
        : parseFloat(value)
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (recordToEdit) {
        await updateRecord(recordToEdit._id, formData);
      } else {
        await createRecord(formData);
      }
      // Reset form
      setFormData(initialFormState);
      if (setRecordToEdit) {
        setRecordToEdit(null);
      }
    } catch (error) {
      // Error is handled in the context
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData(initialFormState);
    if (setRecordToEdit) {
      setRecordToEdit(null);
    }
  };

  return (
    <div className="form-container">
      <h2>{recordToEdit ? 'Update Record' : 'Create New Record'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ticker:</label>
          <input
            type="text"
            name="Ticker"
            value={formData.Ticker}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="text"
            name="Date"
            value={formData.Date}
            onChange={handleInputChange}
            required
            placeholder="YYYYMMDD"
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="text"
            name="Time"
            value={formData.Time}
            onChange={handleInputChange}
            required
            placeholder="HH:MM"
          />
        </div>
        <div className="form-group">
          <label>Open:</label>
          <input
            type="number"
            name="Open"
            value={formData.Open}
            onChange={handleInputChange}
            required
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>High:</label>
          <input
            type="number"
            name="High"
            value={formData.High}
            onChange={handleInputChange}
            required
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Low:</label>
          <input
            type="number"
            name="Low"
            value={formData.Low}
            onChange={handleInputChange}
            required
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Close:</label>
          <input
            type="number"
            name="Close"
            value={formData.Close}
            onChange={handleInputChange}
            required
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Volume:</label>
          <input
            type="number"
            name="Volume"
            value={formData.Volume}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>OI:</label>
          <input
            type="number"
            name="OI"
            value={formData.OI}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{recordToEdit ? 'Update' : 'Create'}</button>
        {recordToEdit && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default OptionForm;