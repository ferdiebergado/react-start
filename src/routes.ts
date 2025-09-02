import { lazy } from 'react'
import { type RouteObject } from 'react-router'

const Home = lazy(() => import('@/Home'))
const NotFound = lazy(() => import('@/components/NotFound'))
const SignUp = lazy(() => import('@/features/auth/components/SignUp'))
const Login = lazy(() => import('@/features/auth/components/Login'))
const ForgotPassword = lazy(
    () => import('@/features/auth/components/ForgotPassword')
)
const ResetPassword = lazy(
    () => import('@/features/auth/components/ResetPassword')
)

export const routes = [
    { index: true, Component: Home },
    { path: 'signup', Component: SignUp },
    { path: 'login', Component: Login },
    { path: 'forgot-password', Component: ForgotPassword },
    { path: 'reset-password', Component: ResetPassword },
    { path: '*', Component: NotFound },
] satisfies RouteObject[]
