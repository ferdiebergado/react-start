import Layout from '@/components/Layout'
import { lazy } from 'react'
import { type RouteObject } from 'react-router'

const Home = lazy(() => import('@/Home'))
const NotFound = lazy(() => import('@/components/NotFound'))
const SignUp = lazy(() => import('@/components/SignUp'))

export const routes: RouteObject[] = [
    {
        Component: Layout,
        children: [
            { index: true, Component: Home },
            { path: 'signup', Component: SignUp },
        ],
    },
    { path: '*', Component: NotFound },
]
