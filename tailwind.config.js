/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-brand)',
        'primary-light': 'var(--color-brand-light)',
        'primary-dark': 'var(--color-brand-dark)',
        surface: 'var(--color-bg)',
        'surface-alt': 'var(--color-bg-secondary)',
        'surface-accent': 'var(--color-bg-accent)',
        foreground: 'var(--color-text)',
        'foreground-secondary': 'var(--color-text-secondary)',
        'foreground-tertiary': 'var(--color-text-tertiary)',
        'foreground-muted': 'var(--color-text-muted)',
        divider: 'var(--color-border)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      spacing: {
        section: '2rem',
        card: '1rem',
      },
      borderRadius: {
        card: '0.5rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};
