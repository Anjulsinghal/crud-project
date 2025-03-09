import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8 animate-fadeIn">
      <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-2">Loading data...</p>
    </div>
  );
};

export default LoadingSpinner;