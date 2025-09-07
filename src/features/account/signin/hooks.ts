import { useAccount } from '@/features/account';
import { formSchema } from '@/features/account/signin/formschema';
import type {
  FormValues,
  SigninHandler,
  SuccessResponse,
  ValidationErrorResponse,
} from '@/features/account/signin/types';
import { api, ValidationError, type ErrorResponse } from '@/lib/api';
import { paths } from '@/routes';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

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

export const useSignInForm = () =>
  useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

export const useSignIn = () => {
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
