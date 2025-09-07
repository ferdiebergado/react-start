import MainLayout from '@/components/layout/MainLayout';
import AccountLayout from '@/features/account/AccountLayout';
import { lazy } from 'react';
import { type RouteObject } from 'react-router';

const Home = lazy(() => import('@/Home'));
const NotFound = lazy(() => import('@/components/error/NotFound'));
const SignUp = lazy(
  () => import('@/features/account/signup/components/SignUp')
);
const SignIn = lazy(
  () => import('@/features/account/signin/components/Signin')
);
const ForgotPassword = lazy(
  () => import('@/features/account/forgot-password/components/ForgotPassword')
);
const ResetPassword = lazy(
  () => import('@/features/account/reset-password/components/ResetPassword')
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
    Component: AccountLayout,
    children: [
      { path: paths.account.signup, Component: SignUp },
      { path: paths.account.signin, Component: SignIn },
      { path: paths.account.forgotPassword, Component: ForgotPassword },
      { path: paths.account.resetPassword, Component: ResetPassword },
    ],
  },
  { path: paths.notFound, Component: NotFound },
] satisfies RouteObject[];
