import type { ContextProviderFactory } from '@/lib/context'
import {
    ThemeProviderContext,
    type Theme,
    type ThemeProviderProps,
} from '@/lib/theme'
import { useEffect, useState } from 'react'

const ThemeProvider: ContextProviderFactory<ThemeProviderProps> = ({
    children,
    defaultTheme = 'system',
    storageKey = 'vite-ui-theme',
    ...props
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem(storageKey)

        let theme: Theme
        if (savedTheme) {
            theme = savedTheme as Theme
        } else {
            theme = defaultTheme
        }

        return theme
    })

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

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            localStorage.setItem(storageKey, newTheme)
            setTheme(newTheme)
        },
    }

    return (
        <ThemeProviderContext {...props} value={value}>
            {children}
        </ThemeProviderContext>
    )
}

export default ThemeProvider
