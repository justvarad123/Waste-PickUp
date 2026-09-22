import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initWebVitalsMonitoring } from './utils/webVitals';

// Initialize Core Web Vitals monitoring (LCP, CLS, INP, FCP)
initWebVitalsMonitoring();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
