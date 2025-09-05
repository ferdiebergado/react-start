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
import { queryKeys } from '@/features/account';
import { api, ValidationError, type APIResponse } from '@/lib/api';
import { paths } from '@/routes';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { memo, type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
  .object({
    email: z.email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number',
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

interface SignUpPayload {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

type SignupHandler = (
  data: FormValues
) => Promise<APIResponse<SignUpPayload, undefined>>;

const signUpUser: SignupHandler = async ({
  email,
  password,
  confirmPassword,
}) => {
  const res = await api.post('/auth/register', {
    email,
    password,
    password_confirm: confirmPassword,
  });

  if (!res.ok) {
    if (res.status === 422) {
      const { message, error } = (await res.json()) as APIResponse<
        undefined,
        Record<string, string>
      >;
      throw new ValidationError(message, error);
    }

    const err = (await res.json()) as APIResponse<undefined, undefined>;
    throw new Error(err.message);
  }

  return (await res.json()) as APIResponse<SignUpPayload, undefined>;
};

const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUpUser,
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: queryKeys.accounts }),
  });
};

const SignInBlock = memo(() => (
  <div className="mt-4 text-center text-sm">
    Already have an account?{' '}
    <Link to={paths.signin} className="underline underline-offset-4">
      Sign In
    </Link>
  </div>
));

const SignupForm: FC = () => {
  const form = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useSignup();

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values);

    mutate(values, {
      onSuccess: ({ message }) => toast.success(message),
      onError: (serverError) => {
        if (serverError instanceof ValidationError) {
          const { details } = serverError;
          if (details) {
            Object.entries(details).forEach(([field, message]) => {
              form.setError(field as keyof FormValues, {
                type: 'server',
                message,
              });
            });
          }
        }
        toast.error(serverError.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
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
      <SignInBlock />
    </Form>
  );
};

export default SignupForm;
