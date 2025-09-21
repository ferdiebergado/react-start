import type { User } from '@/features/account';
import type { formSchema } from '@/features/account/signin/formschema';
import type { APIResponse } from '@/lib/api';
import type { z } from 'zod';

export type FormValues = z.infer<typeof formSchema>;

interface SigninData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

interface Credentials {
  email: string;
  password: string;
}

export type SuccessResponse = APIResponse<SigninData, undefined>;
export type ValidationErrorResponse = APIResponse<undefined, FormValues>;
export type SigninHandler = (
  creds: Credentials
) => Promise<SuccessResponse | undefined>;
