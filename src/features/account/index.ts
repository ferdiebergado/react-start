import { createContext, use } from 'react';

export interface Token {
  value: string;
  type: string;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
  token: Token;
}

export interface AccountState {
  user?: User;
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
