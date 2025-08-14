import { QueryClientProvider } from '@tanstack/react-query'
import { type FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import queryClient from './lib/queryClient'
import { routes } from './routes'

const router = createBrowserRouter(routes)

const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App
