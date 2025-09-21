import { formSchema } from '@/features/account/forgot-password/formschema';
import type {
  ForgotPasswordHandler,
  FormValues,
  SuccessResponse,
} from '@/features/account/forgot-password/types';
import { api, apiRoutes, handleAPIError } from '@/lib/api';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const recoverPassword: ForgotPasswordHandler = async (email) => {
  try {
    const res = await api.post(apiRoutes.auth.forgotPassword, { email });

    return (await res.json()) as SuccessResponse;
  } catch (error) {
    handleAPIError(error);
  }
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
