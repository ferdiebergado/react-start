import { useAccount } from '@/features/account';
import { formSchema } from '@/features/account/signin/formschema';
import type { FormValues, SigninData } from '@/features/account/signin/types';
import {
  api,
  apiRoutes,
  handleAPIError,
  type SuccessResponse,
} from '@/lib/api';
import { paths } from '@/routes';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

async function signinUser(creds: { email: string; password: string }) {
  try {
    const res: SuccessResponse<SigninData> = await api.post(
      apiRoutes.auth.login,
      creds
    );

    return res;
  } catch (error) {
    handleAPIError(error);
  }
}

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
        const { access_token, expires_in, user } = res.data;

        api.setAccessToken(access_token, expires_in);

        signin(user);

        const locationState = location.state as { from?: string } | undefined;
        const intendedURL = locationState?.from ?? paths.home;
        navigate(intendedURL, { replace: true });
      }
    },
  });
};
