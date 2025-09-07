import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import {
  useResetPassword,
  useResetPasswordForm,
} from '@/features/account/reset-password/hooks';
import type { FormValues } from '@/features/account/reset-password/types';
import { ValidationError } from '@/lib/api';
import { replaceFormErrors } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import type { FC } from 'react';
import { toast } from 'sonner';

const ResetPasswordForm: FC = () => {
  const form = useResetPasswordForm();
  const { mutate, isPending } = useResetPassword();

  const onSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: ({ message }) => toast.success(message),
      onError: (serverError) => {
        if (serverError instanceof ValidationError) {
          const errors = serverError.details ?? {};
          replaceFormErrors(form, errors);
        }
        toast.error(serverError.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
          {/* New Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="password">New Password</FormLabel>
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

          <Button type="submit" className="w-full">
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" />
                Resetting password...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
