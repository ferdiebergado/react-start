import { lazy } from 'react';
import { type RouteObject } from 'react-router';

const Home = lazy(() => import('@/Home'));
const NotFound = lazy(() => import('@/components/error/NotFound'));
const SignUp = lazy(() => import('@/features/account/components/SignUp'));
const Login = lazy(() => import('@/features/account/components/Signin'));
const ForgotPassword = lazy(
  () => import('@/features/account/components/ForgotPassword')
);
const ResetPassword = lazy(
  () => import('@/features/account/components/ResetPassword')
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
