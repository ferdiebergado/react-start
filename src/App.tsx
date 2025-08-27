import AuthProvider from '@/components/AuthProvider'
import ErrorFallback from '@/components/ErrorFallback'
import ThemeProvider from '@/components/ThemeProvider'
import { routes } from '@/routes'
import {
    QueryClient,
    QueryClientProvider,
    QueryErrorResetBoundary,
} from '@tanstack/react-query'
import { type FC } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, useRoutes } from 'react-router'

const queryClient = new QueryClient()

const Routes = () => {
    return useRoutes(routes)
}

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
                                <BrowserRouter>
                                    <Routes />
                                </BrowserRouter>
                            </AuthProvider>
                        </ThemeProvider>
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </QueryClientProvider>
    )
}

export default App
