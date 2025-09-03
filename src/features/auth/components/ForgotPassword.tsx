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
import { Input } from '@/components/ui/input';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
  .object({
    email: z.email(),
  })
  .required({ email: true });

export default function ForgetPasswordPreview() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Assuming a function to send reset email
      console.log(values);
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email', error);
      toast.error('Failed to send password reset email. Please try again.');
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address to receive a password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
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
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
