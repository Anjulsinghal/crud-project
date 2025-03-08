import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { OptionProvider } from './context/OptionContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OptionProvider>
      <App />
    </OptionProvider>
  </React.StrictMode>
);
