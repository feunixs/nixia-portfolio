import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { WindowProvider } from './context/WindowContext.jsx';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((_registration) => {
        // Service worker registered successfully
      })
      .catch((_registrationError) => {
        // Service worker registration failed
      });
  });
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WindowProvider>
      <App />
      <SpeedInsights />
    </WindowProvider>
  </React.StrictMode>,
);
