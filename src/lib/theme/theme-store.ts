import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode, themeTokens } from './tokens';

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  tokens: typeof themeTokens.light;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'light',
      toggleTheme: () => {
        const newMode = get().mode === 'light' ? 'dark' : 'light';
        set({ mode: newMode });
      },
      setTheme: (mode) => set({ mode }),
      get tokens() {
        return themeTokens[get().mode];
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ mode: state.mode }),
    }
  )
);
