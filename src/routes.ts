import type { RouteObject } from 'react-router'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import NotFound from './components/NotFound'
import Home from './Home'

export const routes: RouteObject[] = [
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
]
