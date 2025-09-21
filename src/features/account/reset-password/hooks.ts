import { formSchema } from '@/features/account/reset-password/formschema';
import type {
  FormValues,
  ResetPasswordHandler,
  SuccessResponse,
} from '@/features/account/reset-password/types';
import { api, apiRoutes, handleAPIError } from '@/lib/api';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const resetPassword: ResetPasswordHandler = async ({
  password,
  confirmPassword,
}) => {
  try {
    const res = await api.post(apiRoutes.auth.resetPassword, {
      password,
      password_confirm: confirmPassword,
    });
    return (await res.json()) as SuccessResponse;
  } catch (error) {
    handleAPIError(error);
  }
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
