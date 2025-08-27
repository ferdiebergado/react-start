import ErrorFallback from '@/components/ErrorFallback'
import ThemeProvider from '@/components/ThemeProvider'
import Router from '@/router'
import {
    QueryClient,
    QueryClientProvider,
    QueryErrorResetBoundary,
} from '@tanstack/react-query'
import { type FC } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AuthProvider from './components/AuthProvider'

const queryClient = new QueryClient()

const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallback}
                        onReset={reset}
                    >
                        <ThemeProvider>
                            <AuthProvider>
                                <Router />
                            </AuthProvider>
                        </ThemeProvider>
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </QueryClientProvider>
    )
}

export default App
