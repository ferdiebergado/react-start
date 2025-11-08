import { formSchema } from '@/features/account/reset-password/formschema';
import type {
  FormValues,
  ResetPasswordHandler,
} from '@/features/account/reset-password/types';
import {
  api,
  apiRoutes,
  handleAPIError,
  type SuccessResponse,
} from '@/lib/api';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const resetPassword: ResetPasswordHandler = async ({ token, form }) => {
  try {
    const res: SuccessResponse = await api.post(apiRoutes.auth.resetPassword, {
      token,
      password: form.password,
      password_confirm: form.confirmPassword,
    });
    return res;
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
