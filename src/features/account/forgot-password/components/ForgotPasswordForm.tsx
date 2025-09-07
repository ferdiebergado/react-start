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
import {
  useForgotPassword,
  useForgotPasswordForm,
} from '@/features/account/forgot-password/hooks';
import type { FormValues } from '@/features/account/forgot-password/types';
import { ValidationError } from '@/lib/api';
import { replaceFormErrors } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import type { FC } from 'react';
import { toast } from 'sonner';

const ForgotPasswordForm: FC = () => {
  const form = useForgotPasswordForm();
  const { mutate, isPending } = useForgotPassword();

  const onSubmit = ({ email }: FormValues) => {
    mutate(email, {
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
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" />
                Sending reset link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
