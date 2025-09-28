import {
  type SuccessResponse,
  api,
  apiRoutes,
  handleAPIError,
} from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { createContext, use } from 'react';
import type { SigninData } from './signin/types';

export interface Token {
  value: string;
  type: string;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
}

export interface AccountState {
  user?: User;
  isLoading: boolean;
  signin: (user: User) => void;
  signout: () => void;
}

export const AccountContext = createContext<AccountState | undefined>(
  undefined
);

export function useAccount() {
  const context = use(AccountContext);

  if (!context)
    throw new Error('useAccount must be used within an AccountProvider');

  return context;
}

export const queryKeys = {
  accounts: ['accounts'],
};

export async function refreshToken(): Promise<
  SuccessResponse<SigninData> | undefined
> {
  try {
    const data: SuccessResponse<SigninData> = await api.post(
      apiRoutes.auth.refresh,
      undefined,
      { credentials: 'include' }
    );
    return data;
  } catch (error) {
    handleAPIError(error);
  }
}

export const useRefreshToken = () => useMutation({ mutationFn: refreshToken });
