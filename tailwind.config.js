/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          soft: 'var(--primary-soft)',
        },
        secondary: 'var(--secondary)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',
        surface: {
          DEFAULT: 'var(--surface)',
          muted: 'var(--surface-muted)',
          hover: 'var(--surface-hover)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        text: {
          DEFAULT: 'var(--text)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        sidebar: {
          bg: 'var(--sidebar-bg)',
          accent: 'var(--sidebar-accent)',
          text: 'var(--sidebar-text)',
          'text-secondary': 'var(--sidebar-text-secondary)',
          'logo-bg': 'var(--sidebar-logo-bg)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        light: 'var(--shadow-light)',
        dark: 'var(--shadow-dark)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
