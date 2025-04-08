const fs = require('fs');
const path = require('path');

console.log('[Theme] index.js loaded.');
console.log('[Theme] __dirname:', __dirname);
console.log('[Theme] process.cwd():', process.cwd());

global.window = global.window || {};
global.document = global.document || {
  createElement: () => ({}),
  addEventListener: () => {},
};

function loadCss() {
  try {
    // Always load CSS relative to the theme's directory
    const cssPath = path.join(__dirname, 'dist/jsonresume-theme-react.css');
    return fs.readFileSync(cssPath, 'utf8');
  } catch (e) {
    console.error(
      'Error loading CSS from',
      path.join(__dirname, 'dist/jsonresume-theme-react.css'),
      e
    );
    return '';
  }
}

function render(resume) {
  const modulePath = path.join(__dirname, 'dist/index.cjs');
  let module;
  try {
    module = require(modulePath);
  } catch (e) {
    console.error('Error loading built module from', modulePath, e);
    throw new Error(`Could not load theme module from ${modulePath}. Did you run 'npm run build'?`);
  }

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
        <p>Check that the theme was built correctly ('npm run build') and the resume.json is valid.</p>
      </div>
    </body>
    </html>`;
  }
}

module.exports = {
  render,
};
