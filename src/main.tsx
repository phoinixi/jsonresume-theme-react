import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import resumeData from '../resume.json';
import App from './App.tsx';
import type { Locale } from './i18n/config';

const language = (import.meta.env.VITE_LANGUAGE as Locale) || 'en';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App resume={resumeData} language={language} />
  </StrictMode>
);
