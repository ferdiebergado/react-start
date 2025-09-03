import { AccountContext, type User } from '@/features/account';
import type { ContextProviderFactory } from '@/lib/context';
import { useCallback, useMemo, useState, type ReactNode } from 'react';

interface AccountProviderProps {
  children: ReactNode;
}

const AccountProvider: ContextProviderFactory<AccountProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();

  const signin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
  }, []);

  const signout = () => {
    setUser(undefined);
  };

  const value = useMemo(
    () => ({
      user,
      signin,
      signout,
    }),
    [user, signin]
  );

  return <AccountContext value={value}>{children}</AccountContext>;
};

export default AccountProvider;
