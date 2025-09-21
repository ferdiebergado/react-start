import { APIClient, HTTPError } from '@ferdiebergado/fetchx';

const BASEURL = 'http://localhost:8888';

export const api = new APIClient(BASEURL);

export const apiRoutes = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    forgotPassword: '/auth/forgot',
    resetPassword: '/auth/reset',
  },
} as const;

export type APIResponse<T, E> =
  | { message: string; data?: T; error?: undefined }
  | { message: string; error: E; data?: undefined };

export type ErrorResponse = APIResponse<undefined, undefined>;

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
      const { message, error } = responseBody as APIResponse<
        undefined,
        unknown
      >;
      if (error) throw new ValidationError(message, error);
    }

    const { message } = responseBody as ErrorResponse;
    throw new Error(message);
  }

  throw error;
}
