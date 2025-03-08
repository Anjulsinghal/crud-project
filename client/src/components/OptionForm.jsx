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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // 'success' or 'error'
  const { createRecord, updateRecord } = useOption();

  // Set form data when a record is selected for editing
  useEffect(() => {
    if (recordToEdit) {
      setFormData(recordToEdit);
      // Scroll to form when editing
      document.querySelector('.form-container').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
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
    setIsSubmitting(true);
    setFormStatus(null);
    
    try {
      if (recordToEdit) {
        await updateRecord(recordToEdit._id, formData);
      } else {
        await createRecord(formData);
      }
      
      // Reset form and show success message
      setFormData(initialFormState);
      if (setRecordToEdit) {
        setRecordToEdit(null);
      }
      setFormStatus('success');
      
      // Clear success message after 3 seconds
      setTimeout(() => setFormStatus(null), 3000);
      
    } catch (error) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
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
      
      {formStatus === 'success' && (
        <div className="success-message" style={{
          backgroundColor: 'rgba(56, 176, 0, 0.1)',
          color: '#38b000',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          animation: 'fadeIn 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {recordToEdit ? 'Record updated successfully!' : 'Record created successfully!'}
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="error-message">
          An error occurred. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ticker:</label>
          <input
            type="text"
            name="Ticker"
            value={formData.Ticker}
            onChange={handleInputChange}
            required
            placeholder="Enter ticker symbol"
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
            placeholder="0.00"
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
            placeholder="0.00"
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
            placeholder="0.00"
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
            placeholder="0.00"
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
            placeholder="0"
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
            placeholder="0"
          />
        </div>
        <div className="form-actions" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {isSubmitting ? (
              <>
                <span style={{ visibility: 'hidden' }}>
                  {recordToEdit ? 'Update' : 'Create'}
                </span>
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
              recordToEdit ? 'Update Record' : 'Create Record'
            )}
          </button>
          {recordToEdit && (
            <button 
              type="button" 
              onClick={handleCancel}
              style={{ backgroundColor: '#6c757d' }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OptionForm;