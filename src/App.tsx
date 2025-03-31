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

const App: FC<AppProps> = ({ resume, language = 'en' }) => {
  useEffect(() => {
    console.log('Setting language to:', language);
    i18n.changeLanguage(language);

    const html = document.documentElement;
    html.setAttribute('lang', language);
  }, [language]);

  return (
    <I18nextProvider i18n={i18n}>
      <Resume resume={resume} />
    </I18nextProvider>
  );
};

export default App;
