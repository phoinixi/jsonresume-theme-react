const fs = require('fs');
const path = require('path');

// Polyfill browser globals for React in Node
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
  const { getResumeHtml } = require('./dist/index.js');

  const html = getResumeHtml(resume);

  return `<!DOCTYPE html>
    <html lang="en">
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
}

module.exports = { render };
