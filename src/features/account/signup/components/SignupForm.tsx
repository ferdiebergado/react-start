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
import { useSignup, useSignUpForm } from '@/features/account/signup/hooks';
import type { FormValues } from '@/features/account/signup/types';
import { ValidationError } from '@/lib/api';
import { replaceFormErrors } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import { type FC } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

const SignupForm: FC = () => {
  const form = useSignUpForm();
  const { mutate, isPending } = useSignup();

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values);

    mutate(values, {
      onSuccess: ({ message }) => toast.success(message),
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
          {/* Email Field */}
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

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="password"
                    placeholder="******"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    id="confirmPassword"
                    placeholder="******"
                    autoComplete="new-password"
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
                <Loader2Icon className="animate-spin" /> Signing up...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
