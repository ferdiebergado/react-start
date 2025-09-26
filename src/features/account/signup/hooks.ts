import { queryKeys } from '@/features/account';
import { formSchema } from '@/features/account/signup/formschema';
import type {
  FormValues,
  SignUpData,
  SignupHandler,
} from '@/features/account/signup/types';
import {
  api,
  apiRoutes,
  handleAPIError,
  type SuccessResponse,
} from '@/lib/api';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const signUpUser: SignupHandler = async ({
  email,
  password,
  confirmPassword,
}) => {
  try {
    const res: SuccessResponse<SignUpData> = await api.post(
      apiRoutes.auth.register,
      {
        email,
        password,
        password_confirm: confirmPassword,
      }
    );

    return res;
  } catch (error) {
    handleAPIError(error);
  }
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUpUser,
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: queryKeys.accounts }),
  });
};

export const useSignUpForm = () =>
  useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
