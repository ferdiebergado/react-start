import ErrorFallback from '@/components/ErrorFallback'
import Layout from '@/components/Layout'
import ThemeProvider from '@/components/ThemeProvider'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    QueryClient,
    QueryClientProvider,
    QueryErrorResetBoundary,
} from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { MemoryRouter } from 'react-router'

const meta = {
    component: Layout,
    decorators: [
        (Story) => (
            <QueryClientProvider
                client={
                    new QueryClient({
                        defaultOptions: { queries: { retry: 0 } },
                    })
                }
            >
                <QueryErrorResetBoundary>
                    {({ reset }) => (
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}
                            onReset={reset}
                        >
                            <MemoryRouter initialEntries={['/']}>
                                <ThemeProvider>
                                    <Story />
                                </ThemeProvider>
                            </MemoryRouter>
                        </ErrorBoundary>
                    )}
                </QueryErrorResetBoundary>
            </QueryClientProvider>
        ),
    ],
} satisfies Meta<typeof Layout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}
