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
    <div className="bg-white rounded-xl p-8 mb-8 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden hover:before:opacity-100 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-primary before:to-secondary before:opacity-0 before:transition-opacity before:duration-300 form-container animate-slideInRight">
      <h2 className="text-dark font-bold mb-6 text-2xl relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:rounded after:scale-x-60 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
        {recordToEdit ? 'Update Record' : 'Create New Record'}
      </h2>
      
      {formStatus === 'success' && (
        <div className="bg-success/10 text-success p-4 rounded-lg mb-4 animate-fadeIn flex items-center justify-center">
          {recordToEdit ? 'Record updated successfully!' : 'Record created successfully!'}
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="bg-danger/10 text-danger p-4 rounded-lg mb-4 animate-shake">
          An error occurred. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="transition-all duration-300">
          <label className="block mb-2 font-semibold text-sm text-gray-600 transition-all duration-300">Ticker:</label>
          <input
            type="text"
            name="Ticker"
            value={formData.Ticker}
            onChange={handleInputChange}
            required
            placeholder="Enter ticker symbol"
            className="w-full p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-light hover:border-gray-400 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
          />
        </div>
        <div className="transition-all duration-300">
          <label className="block mb-2 font-semibold text-sm text-gray-600 transition-all duration-300">Date:</label>
          <input
            type="text"
            name="Date"
            value={formData.Date}
            onChange={handleInputChange}
            required
            placeholder="YYYY/MM/DD"
            className="w-full p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-light hover:border-gray-400 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
          />
        </div>
        <div className="transition-all duration-300">
          <label className="block mb-2 font-semibold text-sm text-gray-600 transition-all duration-300">Time:</label>
          <input
            type="text"
            name="Time"
            value={formData.Time}
            onChange={handleInputChange}
            required
            placeholder="HH:MM"
            className="w-full p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-light hover:border-gray-400 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
          />
        </div>
        <div className="transition-all duration-300">
          <label className="block mb-2 font-semibold text-sm text-gray-600 transition-all duration-300">Open:</label>
          <input
            type="number"
            name="Open"
            value={formData.Open}
            onChange={handleInputChange}
            required
            step="0.01"
            placeholder="0.00"
            className="w-full p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-light hover:border-gray-400 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
          />
        </div>
        <div className="transition-all duration-300">
          <label className="block mb-2 font-semibold text-sm text-gray-600 transition-all duration-300">High:</label>
          <input
            type="number"
            name="High"
            value={formData.High}
            onChange={handleInputChange}
            required
            step="0.01"
            placeholder="0.00"
            className="w-full p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-light hover:border-gray-400 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
          />
        </div>
        <div className="transition-all duration-300">
          <label className="block mb-2 font-semibold text-sm text-gray-600 transition-all duration-300">Low:</label>
          <input
            type="number"
            name="Low"
            value={formData.Low}
            onChange={handleInputChange}
            required
            step="0.01"
            placeholder="0.00"
            className="w-full p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-light hover:border-gray-400 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
          />
        </div>
        <div className="transition-all duration-300">
          <label className="block mb-2 font-semibold text-sm text-gray-600 transition-all duration-300">Close:</label>
          <input
            type="number"
            name="Close"
            value={formData.Close}
            onChange={handleInputChange}
            required
            step="0.01"
            placeholder="0.00"
            className="w-full p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-light hover:border-gray-400 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
          />
        </div>
        <div className="transition-all duration-300">
          <label className="block mb-2 font-semibold text-sm text-gray-600 transition-all duration-300">Volume:</label>
          <input
            type="number"
            name="Volume"
            value={formData.Volume}
            onChange={handleInputChange}
            required
            placeholder="0"
            className="w-full p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-light hover:border-gray-400 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
          />
        </div>
        <div className="transition-all duration-300">
          <label className="block mb-2 font-semibold text-sm text-gray-600 transition-all duration-300">OI:</label>
          <input
            type="number"
            name="OI"
            value={formData.OI}
            onChange={handleInputChange}
            required
            placeholder="0"
            className="w-full p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-light hover:border-gray-400 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-primary text-white border-none py-3 px-6 mr-4 rounded-lg cursor-pointer text-sm font-semibold transition-all duration-300 inline-flex items-center justify-center hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none relative overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <span className="invisible">
                  {recordToEdit ? 'Update' : 'Create'}
                </span>
                <span className="absolute flex items-center justify-center w-full h-full">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
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
              className="bg-gray-500 text-white border-none py-3 px-6 rounded-lg cursor-pointer text-sm font-semibold transition-all duration-300 inline-flex items-center justify-center hover:bg-gray-600 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
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