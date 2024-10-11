import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Target the root element
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Correct for React 18
  root.render(<App />);
} else {
  console.error('Root element not found');
}
