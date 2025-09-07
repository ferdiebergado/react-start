import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SigninForm from '@/features/account/signin/components/SigninForm';
import SignupBlock from '@/features/account/signin/components/SignupBlock';
import { type FC } from 'react';

const Signin: FC = () => {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to signin to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SigninForm />
        <SignupBlock />
      </CardContent>
    </Card>
  );
};

export default Signin;
