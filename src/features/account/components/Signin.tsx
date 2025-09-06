import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SigninForm from '@/features/account/components/SigninForm';
import { paths } from '@/routes';
import { memo, type FC } from 'react';
import { Link } from 'react-router';

const SignUpBlock = memo(() => (
  <div className="mt-4 text-center text-sm">
    Don&apos;t have an account?{' '}
    <Link to={paths.account.signup} className="underline">
      Sign up
    </Link>
  </div>
));

const Signin: FC = () => {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signin</CardTitle>
        <CardDescription>
          Enter your email and password to signin to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SigninForm />
        <SignUpBlock />
      </CardContent>
    </Card>
  );
};

export default Signin;
