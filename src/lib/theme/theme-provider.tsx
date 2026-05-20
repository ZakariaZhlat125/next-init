'use client';

import { useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useThemeStore } from './theme-store';
import { themeTokens } from './tokens';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeStore();
  const tokens = themeTokens[mode];

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
  }, [mode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: tokens.primary,
          colorSuccess: tokens.success,
          colorWarning: tokens.warning,
          colorError: tokens.danger,
          colorInfo: tokens.info,
          colorBgBase: tokens.surface,
          colorBgElevated: tokens.surface,
          colorTextBase: tokens.text,
          borderRadius: 8,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
