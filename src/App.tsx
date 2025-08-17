import Layout from '@/components/Layout'
import NotFound from '@/components/NotFound'
import { Button } from '@/components/ui/button'
import Home from '@/Home'
import {
    QueryClient,
    QueryClientProvider,
    QueryErrorResetBoundary,
} from '@tanstack/react-query'
import { type FC, type ReactNode } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { BrowserRouter, Route, Routes } from 'react-router'

const App: FC = () => {
    const queryClient = new QueryClient()

    const fallbackRender: (props: FallbackProps) => ReactNode = ({
        error,
        resetErrorBoundary,
    }) => (
        <div>
            There was an error!{' '}
            <Button
                onClick={() => {
                    resetErrorBoundary()
                }}
            >
                Try again
            </Button>
            <pre style={{ whiteSpace: 'normal' }}>
                {(error as Error).message}
            </pre>
        </div>
    )

    return (
        <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary
                        fallbackRender={fallbackRender}
                        onReset={reset}
                    >
                        <BrowserRouter>
                            <Routes>
                                <Route element={<Layout />}>
                                    <Route index element={<Home />} />
                                </Route>
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </QueryClientProvider>
    )
}

export default App
