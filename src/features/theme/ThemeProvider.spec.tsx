import { useTheme, type Theme } from '@/features/theme';
import ThemeProvider from '@/features/theme/ThemeProvider';
import type { FC } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

const ThemeConsumer: FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button
        type="button"
        onClick={() => {
          setTheme('light');
        }}
      >
        Set Light
      </button>
      <button
        type="button"
        onClick={() => {
          setTheme('dark');
        }}
      >
        Set Dark
      </button>
      <button
        type="button"
        onClick={() => {
          setTheme('system');
        }}
      >
        Set System
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('initializes with default theme when nothing saved', async () => {
    const expectedTheme: Theme = 'light';
    const { getByTestId } = render(
      <ThemeProvider defaultTheme={expectedTheme} storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    );

    await expect.element(getByTestId('theme')).toHaveTextContent(expectedTheme);
    expect(document.documentElement.classList.contains(expectedTheme)).toBe(
      true
    );
  });

  it('initializes with saved theme from localStorage', () => {
    const expectedTheme: Theme = 'dark';

    localStorage.setItem('test-theme', expectedTheme);

    const { getByTestId } = render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(getByTestId('theme')).toHaveTextContent(expectedTheme);
    expect(document.documentElement.classList.contains(expectedTheme)).toBe(
      true
    );
  });

  it('switches themes and persists to localStorage', async () => {
    const storageKey = 'test-theme';
    let expectedTheme: Theme;

    const { getByText, getByTestId } = render(
      <ThemeProvider defaultTheme="light" storageKey={storageKey}>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const themeElement = getByTestId('theme');

    expectedTheme = 'dark';
    await getByText('Set Dark').click();
    await expect.element(themeElement).toHaveTextContent(expectedTheme);
    expect(localStorage.getItem(storageKey)).toBe(expectedTheme);
    expect(document.documentElement.classList.contains(expectedTheme)).toBe(
      true
    );

    expectedTheme = 'light';
    await getByText('Set Light').click();
    await expect.element(themeElement).toHaveTextContent(expectedTheme);
    expect(localStorage.getItem('test-theme')).toBe(expectedTheme);
    expect(document.documentElement.classList.contains(expectedTheme)).toBe(
      true
    );
  });

  it('applies system theme and reacts to matchMedia changes', () => {
    const mockMatchMedia = (initial = false) => {
      let listener: ((e: MediaQueryListEvent) => void) | undefined;

      const instance = {
        matches: initial,
        media: '(prefers-color-scheme: dark)',
        addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
          listener = cb;
        },
        removeEventListener: vi.fn(),
        dispatch(e: MediaQueryListEvent) {
          listener?.(e);
        },
      };

      window.matchMedia = vi.fn().mockImplementation(() => instance);
      return instance;
    };

    const mockMedia = mockMatchMedia(false);

    render(
      <ThemeProvider defaultTheme="system" storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('light')).toBe(true);

    mockMedia.dispatch({ matches: true } as MediaQueryListEvent);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
