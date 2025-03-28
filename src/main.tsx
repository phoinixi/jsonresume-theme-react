import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Resume from '../resume.json';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App resume={Resume} />
  </StrictMode>
);
