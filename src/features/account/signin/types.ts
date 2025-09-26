import type { User } from '@/features/account';
import type { formSchema } from '@/features/account/signin/formschema';
import type { SuccessResponse } from '@/lib/api';
import type { z } from 'zod';

export type FormValues = z.infer<typeof formSchema>;

export interface SigninData {
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

export type SigninHandler = (
  creds: Credentials
) => Promise<SuccessResponse<SigninData> | undefined>;
