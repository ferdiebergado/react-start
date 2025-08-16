import ThemeProvider from '@/components/ThemeProvider'
import { useTheme } from '@/lib/theme'
import type { FC } from 'react'
import {
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    vi,
    type Mock,
} from 'vitest'
import { render } from 'vitest-browser-react'

describe('ThemeProvider', () => {
    const localStorageMock = (() => {
        let store: Record<string, string> = {}
        return {
            getItem: (key: string) => store[key] || null,
            setItem: (key: string, value: string) => (store[key] = value),
            clear: () => (store = {}),
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            removeItem: (key: string) => delete store[key],
        }
    })()

    interface MatchMediaMock {
        matches: boolean
        media: string
        onchange: null
        addEventListener: Mock
        removeEventListener: Mock
        dispatchEvent: Mock
    }

    const createMatchMediaMock = (matches = false): MatchMediaMock => ({
        matches,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })

    const matchMediaMock = createMatchMediaMock()

    beforeAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true,
        })
        Object.defineProperty(window, 'matchMedia', {
            value: vi.fn(() => matchMediaMock),
            writable: true,
        })
    })

    beforeEach(() => {
        localStorage.clear()
    })

    const TestComponent: FC = () => {
        const { theme } = useTheme()
        return <div>Current theme: {theme}</div>
    }

    describe('initial render and localstorage', () => {
        it('initializes with a saved theme from localStorage', async () => {
            localStorage.setItem('vite-ui-theme', 'dark')
            const { getByText } = render(
                <ThemeProvider>
                    <TestComponent />
                </ThemeProvider>
            )

            await expect
                .element(getByText('Current theme: dark'))
                .toBeInTheDocument()
            expect(document.documentElement.classList.contains('dark')).toBe(
                true
            )
        })

        it('initializes with defaultTheme if localStorage is empty', async () => {
            const { getByText } = render(
                <ThemeProvider defaultTheme="light">
                    <TestComponent />
                </ThemeProvider>
            )

            await expect
                .element(getByText('Current theme: light'))
                .toBeInTheDocument()
            expect(document.documentElement.classList.contains('light')).toBe(
                true
            )
        })
    })

    describe('switching themes', () => {
        const TestComponentWithControls: FC = () => {
            const { theme, setTheme } = useTheme()
            return (
                <div>
                    <span>Current theme: {theme}</span>
                    <button
                        type="button"
                        onClick={() => {
                            setTheme('light')
                        }}
                    >
                        Set Light
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setTheme('dark')
                        }}
                    >
                        Set Dark
                    </button>
                </div>
            )
        }

        it('switches theme correctly and updates localStorage', async () => {
            const { getByText } = render(
                <ThemeProvider>
                    <TestComponentWithControls />
                </ThemeProvider>
            )

            const darkButton = getByText('Set Dark')
            await darkButton.click()

            await expect
                .element(getByText('Current theme: dark'))
                .toBeInTheDocument()
            expect(localStorage.getItem('vite-ui-theme')).toBe('dark')
            expect(document.documentElement.classList.contains('dark')).toBe(
                true
            )

            const lightButton = getByText('Set Light')
            await lightButton.click()

            expect(getByText('Current theme: light')).toBeInTheDocument()
            expect(localStorage.getItem('vite-ui-theme')).toBe('light')
            expect(document.documentElement.classList.contains('light')).toBe(
                true
            )
            expect(document.documentElement.classList.contains('dark')).toBe(
                false
            )
        })
    })

    describe('system theme', () => {
        it('applies system theme based on initial prefers-color-scheme (dark)', async () => {
            ;(window.matchMedia as Mock).mockImplementationOnce(() =>
                createMatchMediaMock(true)
            )
            const { getByText } = render(
                <ThemeProvider defaultTheme="system">
                    <TestComponent />
                </ThemeProvider>
            )

            await expect
                .element(getByText('Current theme: system'))
                .toBeInTheDocument()
            expect(document.documentElement.classList.contains('dark')).toBe(
                true
            )
            expect(window.matchMedia).toHaveBeenCalledWith(
                '(prefers-color-scheme: dark)'
            )
        })

        it('applies system theme based on initial prefers-color-scheme (light)', async () => {
            ;(window.matchMedia as Mock).mockImplementationOnce(() =>
                createMatchMediaMock(false)
            )
            const { getByText } = render(
                <ThemeProvider defaultTheme="system">
                    <TestComponent />
                </ThemeProvider>
            )

            await expect
                .element(getByText('Current theme: system'))
                .toBeInTheDocument()
            expect(document.documentElement.classList.contains('light')).toBe(
                true
            )
        })

        it('listens for and responds to system theme changes', () => {
            const mockMatchMedia = createMatchMediaMock(true)
            ;(window.matchMedia as Mock).mockImplementationOnce(
                () => mockMatchMedia
            )

            render(
                <ThemeProvider defaultTheme="system">
                    <TestComponent />
                </ThemeProvider>
            )

            expect(document.documentElement.classList.contains('dark')).toBe(
                true
            )

            const listener = mockMatchMedia.addEventListener.mock
                .calls[0][1] as (e: MediaQueryListEvent) => void

            listener({ matches: false } as MediaQueryListEvent)

            expect(document.documentElement.classList.contains('light')).toBe(
                true
            )
            expect(document.documentElement.classList.contains('dark')).toBe(
                false
            )
        })
    })
})
