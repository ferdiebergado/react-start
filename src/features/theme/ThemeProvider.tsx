import { isTheme, ThemeProviderContext, type Theme } from '@/features/theme';
import type { ContextProviderFactory } from '@/lib/context';
import { useEffect, useMemo, useState, type ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

function loadSavedTheme(storageKey: string, defaultTheme: Theme): Theme {
  const savedTheme = localStorage.getItem(storageKey);

  let theme = defaultTheme;
  if (isTheme(savedTheme)) {
    theme = savedTheme;
  }

  return theme;
}

const ThemeProvider: ContextProviderFactory<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    loadSavedTheme(storageKey, defaultTheme)
  );

  useEffect(() => {
    const { classList } = window.document.documentElement;
    classList.remove('light', 'dark');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      classList.remove('light', 'dark');
      classList.add(newSystemTheme);
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      classList.add(systemTheme);

      mediaQuery.addEventListener('change', handleSystemThemeChange);

      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    } else {
      classList.add(theme);
    }

    classList.add(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (newTheme: Theme) => {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      },
    }),
    [theme, storageKey]
  );

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  );
};

export default ThemeProvider;
