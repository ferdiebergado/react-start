import type { formSchema } from '@/features/account/signup/formschema';
import type { APIResponse } from '@/lib/api';
import type { z } from 'zod';

export type FormValues = z.infer<typeof formSchema>;

export interface SignUpData {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SuccessResponse = APIResponse<SignUpData, undefined>;
export type ValidationErrorResponse = APIResponse<undefined, FormValues>;
export type SignupHandler = (data: FormValues) => Promise<SuccessResponse>;
