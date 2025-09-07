import { formSchema } from '@/features/account/reset-password/formschema';
import type {
  FormValues,
  ResetPasswordHandler,
  SuccessResponse,
  ValidationErrorResponse,
} from '@/features/account/reset-password/types';
import { api, ValidationError, type ErrorResponse } from '@/lib/api';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const resetPassword: ResetPasswordHandler = async ({
  password,
  confirmPassword,
}) => {
  const res = await api.post('/auth/reset', {
    password,
    password_confirm: confirmPassword,
  });

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

export const useResetPassword = () =>
  useMutation({ mutationFn: resetPassword });

export const useResetPasswordForm = () =>
  useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
