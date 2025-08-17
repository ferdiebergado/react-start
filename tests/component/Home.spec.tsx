import type { Quote } from '@/home'
import Home from '@/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'

describe('<Home />', () => {
    const mockQuote: Quote = {
        id: 1,
        quote: 'Stay hungry, stay foolish.',
        author: 'Steve Jobs',
    }

    beforeAll(() => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockQuote),
                })
            )
        )
    })

    afterAll(() => {
        vi.unstubAllGlobals()
    })

    it.concurrent('renders quote and author', async () => {
        const queryClient = new QueryClient()

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route index element={<Home />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        )

        await expect.element(getByText(/Random Quote/)).toBeVisible()
        await expect
            .element(getByText(/Stay hungry, stay foolish./))
            .toBeVisible()
        await expect.element(getByText(/Steve Jobs/)).toBeVisible()
    })
})
