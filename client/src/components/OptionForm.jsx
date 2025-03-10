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
  const [formStatus, setFormStatus] = useState(null);
  const { createRecord, updateRecord } = useOption();

  useEffect(() => {
    if (recordToEdit) {
      setFormData(recordToEdit);
      document.querySelector('.form-container').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      setFormData(initialFormState);
    }
  }, [recordToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['Ticker', 'Date', 'Time'].includes(name) ? value : parseFloat(value)
    });
  };

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
      
      setFormData(initialFormState);
      if (setRecordToEdit) setRecordToEdit(null);
      setFormStatus('success');
      
      setTimeout(() => setFormStatus(null), 3000);
    } catch (error) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    if (setRecordToEdit) setRecordToEdit(null);
  };

  return (
    <div className="bg-white rounded-xl p-8 mb-8 shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] form-container animate-slideInRight group relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#1e3a8a] transform origin-left transition-transform scale-x-100"></div>
      <h2 className="text-[#1e3a8a] font-bold mb-6 text-2xl relative inline-block group-hover:text-[#2563eb]">
        {recordToEdit ? 'Update Record' : 'Create New Record'}
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#2563eb] rounded scale-x-60 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
      </h2>
      
      {formStatus === 'success' && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 animate-fadeIn flex items-center justify-center">
          {recordToEdit ? 'Record updated successfully!' : 'Record created successfully!'}
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4 animate-shake">
          An error occurred. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Ticker", type: "text", placeholder: "Enter ticker symbol" },
          { name: "Date", type: "text", placeholder: "YYYY/MM/DD" },
          { name: "Time", type: "text", placeholder: "HH:MM" },
          { name: "Open", type: "number", placeholder: "0.00", step: "0.01" },
          { name: "High", type: "number", placeholder: "0.00", step: "0.01" },
          { name: "Low", type: "number", placeholder: "0.00", step: "0.01" },
          { name: "Close", type: "number", placeholder: "0.00", step: "0.01" },
          { name: "Volume", type: "number", placeholder: "0" },
          { name: "OI", type: "number", placeholder: "0" }
        ].map(field => (
          <div key={field.name} className="transition-all duration-300">
            <label className="block mb-2 font-semibold text-sm text-gray-600">{field.name}:</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              required
              placeholder={field.placeholder}
              step={field.step}
              className="w-full p-3 border border-gray-200 rounded-lg text-base transition-all duration-300 bg-white hover:border-[#2563eb] focus:outline-none focus:border-[#1e3a8a] focus:ring-3 focus:ring-[#1e3a8a]/15"
            />
          </div>
        ))}
        
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-[#1e3a8a] text-white py-3 px-6 mr-4 rounded-lg text-sm font-semibold transition-all duration-300 inline-flex items-center justify-center hover:bg-[#2563eb] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:bg-gray-200 disabled:text-gray-500 relative overflow-hidden"
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
              className="bg-gray-500 text-white py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 inline-flex items-center justify-center hover:bg-gray-600 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
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