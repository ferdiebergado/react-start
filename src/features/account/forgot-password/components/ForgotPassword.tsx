import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ForgotPasswordForm from '@/features/account/forgot-password/components/ForgotPasswordForm';
import type { FC } from 'react';

const ForgetPassword: FC = () => {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address to receive a password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
};

export default ForgetPassword;
