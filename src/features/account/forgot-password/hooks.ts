import { formSchema } from '@/features/account/forgot-password/formschema';
import type {
  ForgotPasswordHandler,
  FormValues,
} from '@/features/account/forgot-password/types';
import {
  api,
  apiRoutes,
  handleAPIError,
  type SuccessResponse,
} from '@/lib/api';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const recoverPassword: ForgotPasswordHandler = async (email) => {
  try {
    const res: SuccessResponse = await api.post(apiRoutes.auth.forgotPassword, {
      email,
    });

    return res;
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
