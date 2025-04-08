# JSON Resume React Theme

A modern, responsive React-based theme for [JSON Resume](https://jsonresume.org/), built with React, TypeScript, and Vite.

![Resume Screenshot](https://raw.githubusercontent.com/phoinixi/jsonresume-theme-react/main/screenshot.png)

## Features

- 🌐 **Multilingual Resumes**: Support for completely different resume content in different languages
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- 🖨️ **Print-Friendly**: Specially formatted for printing or PDF generation.
- 🎨 **Modern UI**: Clean, professional design with customizable styles.
- 📊 **Component-Based**: Structured React components for each resume section.
- Built with React 18 and TypeScript
- Fully supports the complete [JSON Resume schema](https://jsonresume.org/schema/)
- Standalone React application - no external tools required
- Two-column layout for better organization of resume sections
- Print-optimized styling for professional PDF generation
- Markdown support for rich text formatting in resume content

## Using with resumed

This theme is designed to work with [resumed](https://github.com/rbardini/resumed), a maintained alternative to the original `resume-cli`.

**Workflow:**

1.  **Build Theme Assets:** Run `npm run build` once in the theme directory. This compiles the necessary `dist/index.cjs` and CSS files.
2.  **Render Resume:** Use the `resumed` command to render your specific `resume.json` file with the theme.

**Installation:**

Install `resumed` globally:

```bash
npm install -g resumed
```

**Rendering Examples:**

- **Local Theme Development:**
  Navigate to the directory containing your `resume.json` file.

  ```bash
  # Make sure theme assets are built first (in the theme directory)
  # cd ../jsonresume-theme-react && npm run build && cd -

  # Render using the local theme path (relative or absolute)
  resumed render resume.json --theme ../jsonresume-theme-react -o resume.html

  # Render a different language (assuming resume-fr.json exists with "language": "fr")
  resumed render resume-fr.json --theme ../jsonresume-theme-react -o resume-fr.html

  # Render PDF (requires Chromium)
  resumed render resume.json --theme ../jsonresume-theme-react -o resume.pdf
  ```

- **Published Theme (Once Available):**

  ```bash
  # Install the theme globally
  npm install -g jsonresume-theme-react

  # Render using the theme name
  resumed render resume.json --theme react -o resume.html

  # Render French version (theme uses "language" field in resume-fr.json)
  resumed render resume-fr.json --theme react -o resume-fr.html
  ```

## Getting Started for Theme Development

1. Clone the repository: `git clone https://github.com/phoinixi/jsonresume-theme-react.git`
2. Navigate into the theme directory: `cd jsonresume-theme-react`
3. Install dependencies: `npm install`
4. Place your sample `resume.json` file(s) in the root directory.
5. Start the development server (this watches for changes and rebuilds automatically):

   ```bash
   # For English (uses resume.json)
   npm run dev -- --lang=en

   # For French (uses resume-fr.json, if it exists)
   npm run dev -- --lang=fr

   # With a specific resume file
   npm run dev -- --lang=en --resume=path/to/my-resume.json
   ```

   View your resume at `http://localhost:<port>`.

## Other Development Scripts

- `npm run build`: Builds the theme assets for production (used before publishing or with `resumed`).
- `npm run lint`: Run linting checks.
- `npm run format`: Format code using Prettier.

## License
