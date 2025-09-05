import { createContext, use } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export function isTheme(value: unknown): value is Theme {
  if (value === null || typeof value !== 'string') {
    return false;
  }

  return value === 'dark' || value === 'light' || value === 'system';
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeProviderContext = createContext<
  ThemeProviderState | undefined
>(undefined);

export function useTheme() {
  const context = use(ThemeProviderContext);

  if (!context) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
}
