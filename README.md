# JSON Resume React Theme

A modern, responsive React-based theme for [JSON Resume](https://jsonresume.org/), built with React, TypeScript, and Vite.

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

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create your resume.json in the root directory
4. Start the development server: `npm run dev -- --lang=en`

## Multilingual Resumes

This theme supports completely different resume content in different languages. You can have different resume versions for different regions or languages.

### Setting Up Language-Specific Resumes

1. Place your default (English) resume in the root directory as `resume.json`
2. Create language-specific resume files in the root directory following the pattern `resume-{lang}.json`:
   - `resume-fr.json` for French
   - `resume-de.json` for German
   - `resume-it.json` for Italian
   - etc.

Each resume file should follow the [JSON Resume schema](https://jsonresume.org/schema/).

### Development with Language-Specific Resumes

The language parameter is **mandatory** for both dev and build scripts.

```bash
# Run with English (using resume.json)
npm run dev -- --lang=en

# Run with Italian (will look for resume-it.json, falls back to resume.json if not found)
npm run dev -- --lang=it

# Run with French and a custom resume file
npm run dev -- --lang=fr --resume=./path/to/custom-resume.json
```

The script first checks for a language-specific resume file (e.g., `resume-it.json` for Italian) before falling back to the default `resume.json`.

### Building Language-Specific Resumes

Build works exactly like development, but creates optimized production builds:

```bash
# Build English version
npm run build -- --lang=en

# Build Italian version
npm run build -- --lang=it

# Build French version with custom resume
npm run build -- --lang=fr --resume=./path/to/custom-resume.json
```

Builds are output to `dist/{lang}/` directories (e.g., `dist/en/`, `dist/it/`).

## UI Translations

In addition to having completely different resume content for each language, the UI elements (like section titles, buttons, etc.) are also translated into the selected language.

## Language Support

The theme comes with built-in translations for UI elements in:

- English (en)
- German (de)
- French (fr)
- Spanish (es)
- Italian (it)
- Russian (ru)
- Chinese (zh)

## Development

- `npm run dev -- --lang={lang}` - Start the development server with specified language
- `npm run build -- --lang={lang}` - Build for production with specified language
- `npm run lint` - Run linting
- `npm run format` - Format code

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [JSON Resume](https://jsonresume.org/) for the standardized resume schema
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Markdown](https://github.com/remarkjs/react-markdown) for Markdown rendering
