import type { ContextProviderFactory } from '@/lib/context'
import {
    ThemeProviderContext,
    type Theme,
    type ThemeProviderProps,
} from '@/lib/theme'
import { useEffect, useMemo, useState } from 'react'

function loadSavedTheme(storageKey: string, defaultTheme: Theme): Theme {
    const savedTheme = localStorage.getItem(storageKey)

    let theme: Theme
    if (savedTheme) {
        theme = savedTheme as Theme
    } else {
        theme = defaultTheme
    }

    return theme
}

const ThemeProvider: ContextProviderFactory<ThemeProviderProps> = ({
    children,
    defaultTheme = 'system',
    storageKey = 'vite-ui-theme',
    ...props
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(
        loadSavedTheme(storageKey, defaultTheme)
    )

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')

        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            const newSystemTheme = e.matches ? 'dark' : 'light'
            root.classList.remove('light', 'dark')
            root.classList.add(newSystemTheme)
        }

        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

            const systemTheme = mediaQuery.matches ? 'dark' : 'light'
            root.classList.add(systemTheme)

            mediaQuery.addEventListener('change', handleSystemThemeChange)

            return () => {
                mediaQuery.removeEventListener(
                    'change',
                    handleSystemThemeChange
                )
            }
        } else {
            root.classList.add(theme)
        }

        root.classList.add(theme)
    }, [theme])

    const value = useMemo(
        () => ({
            theme,
            setTheme: (newTheme: Theme) => {
                localStorage.setItem(storageKey, newTheme)
                setTheme(newTheme)
            },
        }),
        [theme, storageKey]
    )

    return (
        <ThemeProviderContext {...props} value={value}>
            {children}
        </ThemeProviderContext>
    )
}

export default ThemeProvider
