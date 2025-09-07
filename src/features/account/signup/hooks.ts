import { queryKeys } from '@/features/account';
import { formSchema } from '@/features/account/signup/formschema';
import type {
  FormValues,
  SignupHandler,
  SuccessResponse,
  ValidationErrorResponse,
} from '@/features/account/signup/types';
import { api, ValidationError, type ErrorResponse } from '@/lib/api';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const signUpUser: SignupHandler = async (data) => {
  const res = await api.post('/auth/register', data);

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
