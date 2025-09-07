import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import ForgotPasswordLink from '@/features/account/signin/components/ForgotPasswordLink';
import { useSignIn, useSignInForm } from '@/features/account/signin/hooks';
import type { FormValues } from '@/features/account/signin/types';
import { ValidationError } from '@/lib/api';
import { replaceFormErrors } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import { type FC } from 'react';
import { toast } from 'sonner';

const SigninForm: FC = () => {
  const form = useSignInForm();
  const { mutate, isPending } = useSignIn();

  const onSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: ({ message }) => {
        toast.success(message);
      },
      onError: (serverError) => {
        if (serverError instanceof ValidationError) {
          replaceFormErrors(form, serverError.details ?? {});
        }
        toast.error(serverError.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <div className="flex items-center justify-between">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <ForgotPasswordLink />
                </div>
                <FormControl>
                  <PasswordInput
                    id="password"
                    placeholder="******"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
          <Button variant="outline" className="w-full">
            Signin with Google
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SigninForm;
