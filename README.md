# JSON Resume React Theme

A modern, responsive React-based theme for [JSON Resume](https://jsonresume.org/), built with React, TypeScript, and Vite.

## Features

- Built with React 18 and TypeScript
- Fully supports the complete [JSON Resume schema](https://jsonresume.org/schema/)
- Standalone React application - no external tools required
- Responsive design that looks great on mobile, tablet, and desktop
- Two-column layout for better organization of resume sections
- Print-optimized styling for professional PDF generation
- Markdown support for rich text formatting in resume content
- Modern, clean design with customizable styling

## Quickstart

1. Clone this repository:

```bash
git clone https://github.com/yourusername/jsonresume-theme-react.git
cd jsonresume-theme-react
```

2. Install dependencies:

```bash
npm install
```

3. Add your resume data:

   - Edit the `src/data/resume.json` file with your information following the [JSON Resume schema](https://jsonresume.org/schema/)
   - Alternatively, copy your existing `resume.json` file to the `src/data/` directory

4. Run the development server:

```bash
npm run dev
```

5. View your resume at http://localhost:5173 (or the port shown in your terminal)

## Building for Production

To create a production-ready build:

```bash
npm run build
```

This generates static files in the `dist` directory that can be deployed to any static hosting service like GitHub Pages, Netlify, Vercel, etc.

## Customization

### Styling

The theme's appearance can be customized by modifying the CSS variables in `src/styles/theme.css`:

```css
:root {
  --color-brand: #4f46e5;
  --color-brand-dark: #4338ca;
  --color-brand-light: #6366f1;
  --color-bg: #ffffff;
  --color-bg-secondary: #f9fafb;
  /* and more variables */
}
```

### Layout

The theme uses a modern two-column layout that separates the main content (work experience, education, projects) from the sidebar (skills, languages, certificates):

- Left column (68%): Work experience, education, projects, volunteer work, publications
- Right column (32%): Skills, languages, certificates, awards, interests, references

This layout is responsive and switches to a single column on mobile devices.

### Print Optimization

The theme includes comprehensive print styles for professional-looking PDF exports:

- Proper page breaks to avoid cutting content in awkward places
- Compact spacing to maximize content per page
- Optimized typography for print legibility
- Print-specific adjustments for margins, colors, and layout
- Media query print styles using Tailwind's `print:` variant

These optimizations ensure your resume looks great both on screen and when printed or exported to PDF.

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [JSON Resume](https://jsonresume.org/) for the standardized resume schema
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Markdown](https://github.com/remarkjs/react-markdown) for Markdown rendering
