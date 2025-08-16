import Home from '@/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoutesStub } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'

const mockQuote = {
    quote: 'Stay hungry, stay foolish.',
    author: 'Steve Jobs',
}

vi.mock('@/home/useQuoteQuery', () => ({
    useQuoteQuery: () => ({ data: mockQuote }),
}))

describe('<Home />', () => {
    it('renders quote and author', async () => {
        const queryClient = new QueryClient()

        const StubRouter = createRoutesStub([
            {
                path: '/',
                Component: Home,
                loader: () => mockQuote,
            },
        ])

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <StubRouter initialEntries={['/']} />
            </QueryClientProvider>
        )

        await expect.element(getByText(/Random Quote/)).toBeVisible()
        await expect
            .element(getByText(/Stay hungry, stay foolish./))
            .toBeVisible()
        await expect.element(getByText(/Steve Jobs/)).toBeVisible()
    })
})
