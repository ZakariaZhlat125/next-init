import { useThemeStore } from './theme-store';
import { themeTokens, neumorphicShadows, ThemeMode } from './tokens';

export function useTheme() {
  const { mode, toggleTheme, setTheme } = useThemeStore();
  const tokens = themeTokens[mode];
  const shadows = neumorphicShadows[mode];

  return {
    mode,
    toggleTheme,
    setTheme,
    tokens,
    shadows,
    isDark: mode === 'dark',
    isLight: mode === 'light',
  };
}
