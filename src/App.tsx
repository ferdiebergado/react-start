import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/Home'
import Layout from './components/Layout'

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [{ index: true, Component: Home }],
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
