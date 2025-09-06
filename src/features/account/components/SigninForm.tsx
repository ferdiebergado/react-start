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
import { useAccount, type User } from '@/features/account';
import {
  api,
  ValidationError,
  type APIResponse,
  type ErrorResponse,
} from '@/lib/api';
import { replaceFormErrors } from '@/lib/utils';
import { paths } from '@/routes';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { memo, type FC, type FormEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
  .object({
    email: z.email().trim(),
    password: z.string().trim(),
  })
  .required({
    email: true,
    password: true,
  });

type FormValues = z.infer<typeof formSchema>;

interface SigninData {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

interface Credentials {
  email: string;
  password: string;
}

type SuccessResponse = APIResponse<SigninData, undefined>;
type ValidationErrorResponse = APIResponse<undefined, FormValues>;
type SigninHandler = (creds: Credentials) => Promise<SuccessResponse>;

const signinUser: SigninHandler = async (creds) => {
  const res = await api.post('/auth/login', creds);

  if (!res.ok) {
    if (res.status === 422) {
      const { message, error } = (await res.json()) as ValidationErrorResponse;
      if (error) throw new ValidationError(message, error);
    }

    const { message } = (await res.json()) as ErrorResponse;
    throw new Error(message);
  }

  return (await res.json()) as SuccessResponse;
};

const useSignInForm = () =>
  useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

const useSignIn = () => {
  const { signin } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: signinUser,
    onSuccess: ({ data }) => {
      if (data) {
        const {
          accessToken,
          tokenType,
          expiresIn,
          user: { id, email },
        } = data;

        signin({
          id,
          email,
          token: { value: accessToken, type: tokenType, expiresIn },
        });

        const locationState = location.state as { from?: string } | undefined;
        const intendedURL = locationState?.from ?? paths.home;
        navigate(intendedURL, { replace: true });
      }
    },
  });
};

const ForgotPasswordBlock = memo(() => (
  <Link
    to={paths.account.forgotPassword}
    className="ml-auto inline-block text-sm underline"
  >
    Forgot your password?
  </Link>
));

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

  const handleSubmit: FormEventHandler<HTMLFormElement> =
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    form.handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
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
  );
};

export default SigninForm;
