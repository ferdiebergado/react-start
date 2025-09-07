import type { formSchema } from '@/features/account/reset-password/formschema';
import type { APIResponse } from '@/lib/api';
import type { z } from 'zod';

export type FormValues = z.infer<typeof formSchema>;
export type SuccessResponse = APIResponse<undefined, undefined>;
export type ValidationErrorResponse = APIResponse<undefined, FormValues>;
export type ResetPasswordHandler = (
  data: FormValues
) => Promise<SuccessResponse>;
