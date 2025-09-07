import { formSchema } from '@/features/account/forgot-password/formschema';
import type {
  ForgotPasswordHandler,
  FormValues,
  SuccessResponse,
  ValidationErrorResponse,
} from '@/features/account/forgot-password/types';
import { api, ValidationError, type ErrorResponse } from '@/lib/api';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const recoverPassword: ForgotPasswordHandler = async (email) => {
  const res = await api.post('/auth/forgot', { email });

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

export const useForgotPassword = () =>
  useMutation({ mutationFn: recoverPassword });

export const useForgotPasswordForm = () =>
  useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
