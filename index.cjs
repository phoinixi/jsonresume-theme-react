const fs = require('fs');
const path = require('path');

global.window = global.window || {};
global.document = global.document || {
  createElement: () => ({}),
  addEventListener: () => {},
};

function loadCss() {
  try {
    return fs.readFileSync(path.join(__dirname, 'dist/jsonresume-theme-react.css'), 'utf8');
  } catch (e) {
    console.error('Error loading CSS:', e);
    return '';
  }
}

function render(resume) {
  const module = require('./dist/index.cjs');
  const getResumeHtml = module.getResumeHtml;

  const language = resume.language || 'en';
  console.log(`Using language: ${language}`);

  try {
    const html = getResumeHtml(resume, language);

    return `<!DOCTYPE html>
      <html lang="${language}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resume.basics?.name || 'Resume'}</title>
        <style>${loadCss()}</style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
      </html>`;
  } catch (error) {
    console.error('Error rendering resume:', error);

    return `<!DOCTYPE html>
    <html lang="${language}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${resume.basics?.name || 'Resume'}</title>
      <style>${loadCss()}</style>
    </head>
    <body>
      <div id="root">
        <h1>Error Rendering Resume</h1>
        <p>There was an error rendering your resume: ${error.message}</p>
      </div>
    </body>
    </html>`;
  }
}

module.exports = {
  render,
};
