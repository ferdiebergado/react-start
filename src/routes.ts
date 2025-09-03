import { lazy } from 'react';
import { type RouteObject } from 'react-router';

const Home = lazy(() => import('@/Home'));
const NotFound = lazy(() => import('@/components/NotFound'));
const SignUp = lazy(() => import('@/features/auth/components/SignUp'));
const Login = lazy(() => import('@/features/auth/components/Login'));
const ForgotPassword = lazy(
  () => import('@/features/auth/components/ForgotPassword')
);
const ResetPassword = lazy(
  () => import('@/features/auth/components/ResetPassword')
);

export const paths = {
  signup: '/signup',
  signin: '/signin',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
};

export const routes = [
  { index: true, Component: Home },
  { path: paths.signup, Component: SignUp },
  { path: paths.signin, Component: Login },
  { path: paths.forgotPassword, Component: ForgotPassword },
  { path: paths.resetPassword, Component: ResetPassword },
  { path: '*', Component: NotFound },
] satisfies RouteObject[];
