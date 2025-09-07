import type { User } from '@/features/account';
import type { formSchema } from '@/features/account/signin/formschema';
import type { APIResponse } from '@/lib/api';
import type { z } from 'zod';

export type FormValues = z.infer<typeof formSchema>;

interface SigninData {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

interface Credentials {
  email: string;
  password: string;
}

export type SuccessResponse = APIResponse<SigninData, undefined>;
export type ValidationErrorResponse = APIResponse<undefined, FormValues>;
export type SigninHandler = (creds: Credentials) => Promise<SuccessResponse>;
