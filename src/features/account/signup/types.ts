import type { formSchema } from '@/features/account/signup/formschema';
import type { SuccessResponse } from '@/lib/api';
import type { z } from 'zod';

export type FormValues = z.infer<typeof formSchema>;

export interface SignUpData {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SignupHandler = (
  data: FormValues
) => Promise<SuccessResponse<SignUpData> | undefined>;
