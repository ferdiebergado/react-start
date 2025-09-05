import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
  .object({
    password: z.string().trim(),
    confirmPassword: z.string().trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword)
  .required({ password: true, confirmPassword: true });

type ResetPasswordFormData = z.infer<typeof formSchema>;

export default function ResetPasswordPreview() {
  const form = useForm<ResetPasswordFormData>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: ResetPasswordFormData) {
    try {
      console.log(values);
      toast.success(
        'Password reset successful. You can now log in with your new password.'
      );
    } catch (error) {
      console.error('Error resetting password', error);
      toast.error('Failed to reset the password. Please try again.');
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your new password to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
            className="space-y-8"
          >
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
                Reset Password
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
