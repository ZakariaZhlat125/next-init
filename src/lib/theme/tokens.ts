export const themeTokens = {
  light: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primarySoft: '#dbeafe',
    secondary: '#f1f5f9',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#0284c7',
    surface: '#ffffff',
    surfaceMuted: '#f1f5f9',
    surfaceHover: '#eef2ff',
    background: '#f8fafc',
    text: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#64748b',
    border: '#e2e8f0',
    borderStrong: '#cbd5e1',
    shadowLight: 'rgba(255, 255, 255, 0.9)',
    shadowDark: 'rgba(15, 23, 42, 0.10)',
    focusRing: 'rgba(37, 99, 235, 0.28)',
  },
  dark: {
    primary: '#60a5fa',
    primaryHover: '#3b82f6',
    primarySoft: 'rgba(96, 165, 250, 0.16)',
    secondary: '#1e293b',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#f87171',
    info: '#38bdf8',
    surface: '#111827',
    surfaceMuted: '#1e293b',
    surfaceHover: '#1d4ed8',
    background: '#0b1220',
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    border: '#243244',
    borderStrong: '#334155',
    shadowLight: 'rgba(217, 221, 228, 0.12)',
    shadowDark: 'rgba(2, 6, 23, 0.65)',
    focusRing: 'rgba(96, 165, 250, 0.35)',
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
};

export const borderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
};

export const neumorphicShadows = {
  light: {
    default: '8px 8px 16px #C5C5C5, -8px -8px 16px #FFFFFF',
    hover: '12px 12px 20px #C5C5C5, -12px -12px 20px #FFFFFF',
    pressed: 'inset 6px 6px 12px #C5C5C5, inset -6px -6px 12px #FFFFFF',
  },
  dark: {
    default: '8px 8px 16px #0A0A0A, -8px -8px 16px #2A2A2A',
    hover: '12px 12px 20px #0A0A0A, -12px -12px 20px #2A2A2A',
    pressed: 'inset 6px 6px 12px #0A0A0A, inset -6px -6px 12px #2A2A2A',
  },
};

export type ThemeMode = 'light' | 'dark';
export type ThemeTokens = typeof themeTokens.light;
