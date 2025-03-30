import { FC, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { Resume } from './components/Resume';
import type { ResumeSchema } from './types/resumeSchema';
import type { Locale } from './i18n/config';

interface AppProps {
  resume: ResumeSchema;
  language?: Locale;
}

// Get language from environment variable or URL parameter, with fallback to prop
const getLanguage = (propLanguage?: Locale): Locale => {
  // Check for environment variable (used in development with custom script)
  if (import.meta.env.VITE_LANGUAGE) {
    return import.meta.env.VITE_LANGUAGE as Locale;
  }

  // Check URL parameters (used in production)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam) {
      return langParam as Locale;
    }
  }

  // Fallback to prop or default
  return propLanguage || 'en';
};

const App: FC<AppProps> = ({ resume, language = 'en' }) => {
  const currentLanguage = getLanguage(language);

  useEffect(() => {
    console.log('Setting language to:', currentLanguage);
    i18n.changeLanguage(currentLanguage);

    // Force update language if needed
    const html = document.documentElement;
    html.setAttribute('lang', currentLanguage);

    // Debug translations
    console.log('i18n ready:', i18n.isInitialized);
    console.log('Current language:', i18n.language);
    console.log('Available languages:', i18n.options.supportedLngs);
  }, [currentLanguage]);

  return (
    <I18nextProvider i18n={i18n}>
      <Resume resume={resume} />
    </I18nextProvider>
  );
};

export default App;
