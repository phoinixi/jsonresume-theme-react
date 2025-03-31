import './index.css';

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { ResumeSchema } from './types/resumeSchema';
import App from './App';
import type { Locale } from './i18n/config';
import i18n from './i18n/config';

export function getResumeHtml(resume: ResumeSchema, language: Locale = 'en') {
  i18n.changeLanguage(language);

  return renderToString(createElement(App, { resume, language }));
}
