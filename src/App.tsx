import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './components/Home'
import Layout from './components/Layout'
import NotFound from './components/NotFound'

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        ErrorBoundary: ErrorBoundary,
        children: [{ index: true, Component: Home }],
    },
    {
        path: '*',
        Component: NotFound,
    },
])

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App
