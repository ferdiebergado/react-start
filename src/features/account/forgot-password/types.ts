import type { formSchema } from '@/features/account/forgot-password/formschema';
import type { SuccessResponse } from '@/lib/api';
import type { z } from 'zod';

export type FormValues = z.infer<typeof formSchema>;

export type ForgotPasswordHandler = (
  email: string
) => Promise<SuccessResponse | undefined>;
