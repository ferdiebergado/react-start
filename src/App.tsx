import FallbackRender from '@/components/ErrorFallback'
import ThemeProvider from '@/components/ThemeProvider'
import Router from '@/router'
import {
    QueryClient,
    QueryClientProvider,
    QueryErrorResetBoundary,
} from '@tanstack/react-query'
import { type FC } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const queryClient = new QueryClient()

const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary
                        fallbackRender={FallbackRender}
                        onReset={reset}
                    >
                        <ThemeProvider>
                            <Router />
                        </ThemeProvider>
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </QueryClientProvider>
    )
}

export default App
