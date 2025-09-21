import { useAccount } from '@/features/account';
import { formSchema } from '@/features/account/signin/formschema';
import type {
  FormValues,
  SigninHandler,
  SuccessResponse,
} from '@/features/account/signin/types';
import { api, apiRoutes, handleAPIError } from '@/lib/api';
import { paths } from '@/routes';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

const signinUser: SigninHandler = async (creds) => {
  try {
    const res = await api.post(apiRoutes.auth.login, creds);

    return (await res.json()) as SuccessResponse;
  } catch (error) {
    handleAPIError(error);
  }
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
    onSuccess: (res) => {
      if (res?.data) {
        const {
          accessToken,
          tokenType,
          expiresIn,
          user: { id, email },
        } = res.data;

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
