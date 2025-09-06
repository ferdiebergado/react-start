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
import { PasswordInput } from '@/components/ui/password-input';
import { useAccount, type User } from '@/features/account';
import { api, ValidationError, type APIResponse } from '@/lib/api';
import { paths } from '@/routes';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { memo, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

const ForgotPasswordBlock = memo(() => (
  <Link
    to={paths.forgotPassword}
    className="ml-auto inline-block text-sm underline"
  >
    Forgot your password?
  </Link>
));

const SignUpBlock = memo(() => (
  <div className="mt-4 text-center text-sm">
    Don&apos;t have an account?{' '}
    <Link to={paths.signup} className="underline">
      Sign up
    </Link>
  </div>
));

interface SigninData {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

interface RouteState {
  from: string;
}

function isRouteState(object: unknown): object is RouteState {
  if (object === null || typeof object !== 'object') {
    return false;
  }
  return 'from' in object && typeof object.from === 'string';
}

const formSchema = z
  .object({
    email: z.email().trim(),
    password: z.string().trim(),
  })
  .required({
    email: true,
    password: true,
  });

interface Credentials {
  email: string;
  password: string;
}

async function signinUser(creds: Credentials): Promise<SigninData> {
  const res = await api.post('/auth/login', creds);

  if (!res.ok) {
    if (res.status === 422) {
      const { message, error } = (await res.json()) as APIResponse<
        undefined,
        FormValues
      >;
      throw new ValidationError(message, error);
    }

    const err = (await res.json()) as APIResponse<undefined, undefined>;
    throw new Error(err.message);
  }

  return (await res.json()) as SigninData;
}

type FormValues = z.infer<typeof formSchema>;

const Signin: FC = () => {
  const form = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signin } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate, isPending } = useMutation({
    mutationFn: signinUser,
    onSuccess: ({ accessToken, tokenType, expiresIn, user: { id, email } }) => {
      signin({
        id,
        email,
        token: { value: accessToken, type: tokenType, expiresIn },
      });

      toast.success('You are now signed in!');

      let redirectPath = '/';
      if (isRouteState(location.state)) {
        redirectPath = location.state.from;
      }
      navigate(redirectPath);
    },
    onError: (error) => {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signin</CardTitle>
        <CardDescription>
          Enter your email and password to signin to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
            className="space-y-8"
          >
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
                      <ForgotPasswordBlock />
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
                  'Signin'
                )}
              </Button>
              <Button variant="outline" className="w-full">
                Signin with Google
              </Button>
            </div>
          </form>
        </Form>
        <SignUpBlock />
      </CardContent>
    </Card>
  );
};

export default Signin;
