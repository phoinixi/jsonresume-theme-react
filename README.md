# JSON Resume React Theme Starter

A modern, responsive React-based theme for [JSON Resume](https://jsonresume.org/), built with React, TypeScript, and Vite.

![JSON Resume React Theme Preview](https://via.placeholder.com/800x400?text=JSON+Resume+React+Theme)

## Features

- Built with React 18 and TypeScript
- Fully supports the complete [JSON Resume schema](https://jsonresume.org/schema/)
- Standalone React application - no external tools required
- Responsive design that looks great on mobile, tablet, and desktop
- Two-column layout for better organization of resume sections
- Print-optimized styling for professional PDF generation
- Markdown support for rich text formatting in resume content
- Modern, clean design with customizable styling

## Installation & Usage

### Quickstart

1. Clone this repository:

```bash
git clone https://github.com/yourusername/json-resume-theme-starter-react.git
cd json-resume-theme-starter-react
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

### Creating a PDF

To generate a PDF of your resume:

1. Open your resume in Chrome/Edge
2. Press `Ctrl+P` (or `Cmd+P` on Mac) to open the print dialog
3. Change the destination to "Save as PDF"
4. Set margins to "None" or "Minimal"
5. Enable "Background graphics" option if available
6. Click "Save" to generate your PDF

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

### Two-Column Layout

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

### Structure

The theme follows a component-based structure where each section of the resume is represented by its own React component:

- `Header.tsx` - Contact information, name, and summary
- `WorkExperience.tsx` - Work history and experiences
- `Education.tsx` - Educational background
- `Skills.tsx` - Skills and competencies
- `Projects.tsx` - Projects and works
- `Volunteer.tsx` - Volunteer experiences
- `Awards.tsx` - Recognitions and awards
- `Publications.tsx` - Published works
- `Languages.tsx` - Language proficiencies
- `Interests.tsx` - Personal interests and hobbies
- `References.tsx` - Professional references
- `Certificates.tsx` - Professional certifications

### Markdown Support

This theme supports Markdown formatting in your resume content, allowing you to add rich text formatting such as bold text, italics, lists, and more to make your resume stand out.

See [MARKDOWN.md](docs/MARKDOWN.md) for detailed documentation on how to use Markdown in your resume.

Example:

```json
{
  "basics": {
    "summary": "I'm a **software engineer** with experience in:\n\n- Frontend development\n- Backend systems\n- Cloud infrastructure"
  }
}
```

The theme properly renders Markdown in:

- Basic summary section
- Work experience descriptions and highlights
- Project descriptions
- Award summaries
- Reference texts
- And other text content throughout the resume

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [JSON Resume](https://jsonresume.org/) for the standardized resume schema
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Markdown](https://github.com/remarkjs/react-markdown) for Markdown rendering
