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
import { useAuth, type User } from '@/features/auth';
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
  const res = await fetch('http://localhost:8888/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  });

  if (!res.ok) throw new Error('Signin request failed.');

  return (await res.json()) as SigninData;
}

type SigninForm = z.infer<typeof formSchema>;

const Signin: FC = () => {
  const form = useForm<SigninForm>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate, isPending } = useMutation({
    mutationFn: signinUser,
    onSuccess: ({ accessToken, tokenType, expiresIn, user: { id, email } }) => {
      login({
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

  const onSubmit = (values: SigninForm) => {
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
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.handleSubmit(onSubmit)}
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
