import type { SigninData } from '@/features/account/signin/types';
import {
  APIClient,
  HTTPError,
  type TokenRenewHandler,
} from '@ferdiebergado/fetchx';

const csrfCookieName = '__Secure-csrf_token';
const csrfHeaderName = 'X-CSRF-Token';

export const api = new APIClient({
  baseUrl: '/api',
  csrfCookieName,
  csrfHeaderName,
});

export const apiRoutes = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    forgotPassword: '/auth/forgot',
    resetPassword: '/auth/reset',
    verify: '/auth/verify',
    refresh: '/auth/refresh',
  },
} as const;

const tokenRenewHandler: TokenRenewHandler = async () => {
  const { data }: SuccessResponse<SigninData> = await api.post(
    apiRoutes.auth.refresh,
    undefined,
    {
      credentials: 'include',
    }
  );

  if (!data) return { accessToken: '', expiresAt: 0 };

  const expiresAt = Date.now() + data.expires_in * 1000;
  return {
    accessToken: data.access_token,
    expiresAt,
  };
};

api.setTokenRenewHandler(tokenRenewHandler);

export interface SuccessResponse<T = unknown> {
  message: string;
  data?: T;
}

export interface ErrorResponse
  extends Record<string, string | undefined | Record<string, string>> {
  message: string;
  code?: string;
  error?: Record<string, string>;
}

export class ValidationError<T> extends Error {
  name: string;
  details?: Partial<T>;

  constructor(message: string, details?: Partial<T>) {
    super(message);
    this.details = details;
    this.name = 'ValidationError';
  }
}

export function handleAPIError(error: unknown) {
  if (error instanceof HTTPError) {
    const { status, responseBody } = error;
    if (status === 422) {
      const { message, error } = responseBody as ErrorResponse;
      if (error) throw new ValidationError(message, error);
    }

    const { message } = responseBody as ErrorResponse;
    throw new Error(message);
  }

  throw error;
}
