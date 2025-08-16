import type { RouteObject } from 'react-router'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import NotFound from './components/NotFound'
import Spinner from './components/Spinner'
import Home from './Home'
import { quoteLoader } from './home'
import queryClient from './lib/queryClient'

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: Layout,
        ErrorBoundary: ErrorBoundary,
        HydrateFallback: Spinner,
        children: [
            { index: true, Component: Home, loader: quoteLoader(queryClient) },
        ],
    },
    {
        path: '*',
        Component: NotFound,
    },
]
