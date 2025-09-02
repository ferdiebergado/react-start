import { createContext, use, type ReactNode } from 'react'

export type Theme = 'dark' | 'light' | 'system'

export interface ThemeProviderProps {
    children: ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

interface ThemeProviderState {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export const ThemeProviderContext = createContext<
    ThemeProviderState | undefined
>(undefined)

export function useTheme() {
    const context = use(ThemeProviderContext)

    if (!context)
        throw new Error('useTheme must be used within a ThemeProvider')

    return context
}
