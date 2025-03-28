import './index.css';

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { ResumeSchema } from './types/resumeSchema';
import App from './App';

export function getResumeHtml(resume: ResumeSchema) {
  return renderToString(createElement(App, { resume }));
}
