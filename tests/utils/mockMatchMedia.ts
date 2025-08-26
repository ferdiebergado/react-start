import { vi } from 'vitest'

export function mockMatchMedia(initial = false) {
    let listener: ((e: MediaQueryListEvent) => void) | undefined

    const instance = {
        matches: initial,
        media: '(prefers-color-scheme: dark)',
        addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
            listener = cb
        },
        removeEventListener: vi.fn(),
        dispatch(e: MediaQueryListEvent) {
            listener?.(e)
        },
    }

    window.matchMedia = vi.fn().mockImplementation(() => instance)
    return instance
}
