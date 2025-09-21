import { queryKeys } from '@/features/account';
import { formSchema } from '@/features/account/signup/formschema';
import type {
  FormValues,
  SignupHandler,
  SuccessResponse,
} from '@/features/account/signup/types';
import { api, apiRoutes, handleAPIError } from '@/lib/api';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const signUpUser: SignupHandler = async ({
  email,
  password,
  confirmPassword,
}) => {
  try {
    const res = await api.post(apiRoutes.auth.register, {
      email,
      password,
      password_confirm: confirmPassword,
    });

    return (await res.json()) as SuccessResponse;
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
