import type { RouteObject } from 'react-router'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './components/Home'
import Layout from './components/Layout'
import NotFound from './components/NotFound'

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
