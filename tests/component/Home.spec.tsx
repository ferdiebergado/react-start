import Home from '@/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'

describe('Home', () => {
    it('renders quote and author', async () => {
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
