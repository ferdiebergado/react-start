import type { formSchema } from '@/features/account/reset-password/formschema';
import type { SuccessResponse } from '@/lib/api';
import type { z } from 'zod';

export type FormValues = z.infer<typeof formSchema>;
export type ResetPasswordHandler = (
  data: FormValues
) => Promise<SuccessResponse | undefined>;
