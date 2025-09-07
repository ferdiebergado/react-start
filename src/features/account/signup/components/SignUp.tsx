import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SigninBlock from '@/features/account/signup/components/SigninBlock';
import SignupForm from '@/features/account/signup/components/SignupForm';
import { type FC } from 'react';

const SignUp: FC = () => {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Create a new account by filling out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
        <SigninBlock />
      </CardContent>
    </Card>
  );
};

export default SignUp;
