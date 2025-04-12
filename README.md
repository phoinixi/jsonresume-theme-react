# JSON Resume Theme React

A modern, responsive React-based theme for [JSON Resume](https://jsonresume.org/), built with React, TypeScript, and Vite.

## Features

- 🚀 **Modern Stack**: Built with React 18, TypeScript, and Vite
- 🌐 **Multilingual Support**: Built-in internationalization with i18next
- 🎨 **Modern UI**: Clean, professional design with Tailwind CSS
- 📱 **Responsive Design**: Optimized for all devices
- 📝 **Markdown Support**: Rich text formatting in descriptions
- 🖨️ **Print-Friendly**: Optimized for PDF generation
- 🔍 **Type Safety**: Full TypeScript support with generated types

## Development

### Prerequisites

- Node.js 20+
- npm 9+

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/phoinixi/jsonresume-theme-react.git
   cd jsonresume-theme-react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Create your resume:

   - Place your `resume.json` file in the project root
   - For multiple languages, create files like `resume-fr.json`, `resume-de.json`, etc.

5. Build and render your resume:
   ```bash
   npm run render:resumed
   ```
   This will:
   - Build the theme
   - Render your resume
   - Output to `public/index.html`

### Multilingual Support

The theme supports multiple languages through separate JSON files. Each language version should have its own resume file with the language code in the filename (e.g., `resume-fr.json` for French).

#### Serving Different Languages

1. Create language-specific resume files:

   ```bash
   # English (default)
   resume.json

   # French
   resume-fr.json

   # German
   resume-de.json
   ```

2. Each resume file should include the language code in its metadata:

   ```json
   {
     "meta": {
       "language": "fr" // For French version
     }
     // ... rest of your resume data
   }
   ```

3. Start the development server with a specific language:

   ```bash
   # For English
   npm run dev -- --lang=en

   # For French
   npm run dev -- --lang=fr

   # For German
   npm run dev -- --lang=de
   ```

#### Building Multiple Languages

To build and render resumes in different languages, simply specify the resume file:

```bash
# Build and render English version
npm run render:resumed resume.json

# Build and render French version
npm run render:resumed resume-fr.json

# Build and render German version
npm run render:resumed resume-de.json
```

The script will automatically detect the language from the resume file's content and use it for rendering. Each build will create a separate HTML file in the `public` directory:

- `public/index.html` (English)
- `public/index-fr.html` (French)
- `public/index-de.html` (German)

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build the theme for production
- `npm run render:resumed`: Build and render your resume
- `npm run generate-types`: Generate TypeScript types from JSON schema
- `npm run test`: Run test suite
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── i18n/          # Internationalization
│   ├── styles/        # CSS and Tailwind config
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── scripts/           # Build and render scripts
├── public/            # Static assets
└── resume.json        # Sample resume
```

## License

MIT
