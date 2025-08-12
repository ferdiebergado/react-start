import type { RouteObject } from 'react-router'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import NotFound from './components/NotFound'
import Spinner from './components/Spinner'
import Home from './Home'

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: Layout,
        ErrorBoundary: ErrorBoundary,
        HydrateFallback: Spinner,
        children: [{ index: true, Component: Home }],
    },
    {
        path: '*',
        Component: NotFound,
    },
]
