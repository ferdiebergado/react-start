import MainLayout from '@/components/layout/MainLayout';
import AccountLayout from '@/features/account/components/AccountLayout';
import { lazy } from 'react';
import { type RouteObject } from 'react-router';

const Home = lazy(() => import('@/Home'));
const NotFound = lazy(() => import('@/components/error/NotFound'));
const SignUp = lazy(() => import('@/features/account/components/SignUp'));
const SignIn = lazy(() => import('@/features/account/components/Signin'));
const ForgotPassword = lazy(
  () => import('@/features/account/components/ForgotPassword')
);
const ResetPassword = lazy(
  () => import('@/features/account/components/ResetPassword')
);

export const paths = {
  home: '/',
  account: {
    signup: '/account/signup',
    signin: '/account/signin',
    forgotPassword: '/account/forgot-password',
    resetPassword: '/account/reset-password',
  },
  notFound: '*',
} as const;

export const routes = [
  {
    Component: MainLayout,
    children: [{ path: paths.home, Component: Home }],
  },
  {
    path: '/account',
    Component: AccountLayout,
    children: [
      { path: 'signup', Component: SignUp },
      { path: 'signin', Component: SignIn },
      { path: 'forgot-password', Component: ForgotPassword },
      { path: 'reset-password', Component: ResetPassword },
    ],
  },
  { path: paths.notFound, Component: NotFound },
] satisfies RouteObject[];
