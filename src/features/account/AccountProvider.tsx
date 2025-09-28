import { AccountContext, useRefreshToken, type User } from '@/features/account';
import type { ContextProviderFactory } from '@/lib/types';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface AccountProviderProps {
  children: ReactNode;
}

const AccountProvider: ContextProviderFactory<AccountProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const { mutate } = useRefreshToken();

  const signin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
  }, []);

  const signout = () => {
    setUser(undefined);
  };

  useEffect(() => {
    if (user) {
      setIsLoading(false);
      return;
    }

    mutate(undefined, {
      onSuccess: (data) => {
        const user = data?.data?.user;
        console.log('user', user);
        setUser(user);
        setIsLoading(false);
      },
      onError: (e) => {
        console.error(e);
        setIsLoading(false);
      },
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      signin,
      signout,
    }),
    [user, signin, isLoading]
  );

  return <AccountContext value={value}>{children}</AccountContext>;
};

export default AccountProvider;
