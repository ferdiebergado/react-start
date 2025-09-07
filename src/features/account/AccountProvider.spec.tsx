import { useAccount, type User } from '@/features/account';
import AccountProvider from '@/features/account/AccountProvider';
import type { FC } from 'react';
import { describe, expect, it } from 'vitest';
import { render, renderHook } from 'vitest-browser-react';

const mockUser: User = {
  id: 'abc123',
  email: 'abc@example.com',
  token: { value: 'token', type: 'Bearer', expiresIn: 18000 },
};

const AccountConsumer: FC = () => {
  const { user, signin, signout } = useAccount();

  const handleSignin = () => {
    signin(mockUser);
  };

  return (
    <div>
      <div data-testid="user">
        {user ? `${user.email} (${user.email})` : 'no user'}
      </div>
      <button type="button" data-testid="login" onClick={handleSignin}>
        login
      </button>
      <button type="button" data-testid="logout" onClick={signout}>
        logout
      </button>
    </div>
  );
};

const renderWithProvider = () => {
  return render(
    <AccountProvider>
      <AccountConsumer />
    </AccountProvider>
  );
};

describe('AccountProvider', () => {
  it('provides default state', async () => {
    const { getByTestId } = renderWithProvider();

    await expect.element(getByTestId('user')).toHaveTextContent('no user');
  });

  it('can signin and signout', async () => {
    const { getByTestId } = renderWithProvider();

    const signinBtn = getByTestId('login');
    await signinBtn.click();
    await expect.element(getByTestId('user')).toHaveTextContent(mockUser.email);

    const signoutBtn = getByTestId('logout');
    await signoutBtn.click();
    await expect.element(getByTestId('user')).toHaveTextContent('no user');
  });
});

describe('useAccount', () => {
  it('throws if used outside AccountProvider', () => {
    expect(() => renderHook(() => useAccount())).toThrowError(
      'useAccount must be used within an AccountProvider'
    );
  });

  it('provides default state', () => {
    const { result } = renderHook(() => useAccount(), {
      wrapper: AccountProvider,
    });

    expect(result.current.user).toBeUndefined();
  });

  it('signs in and signs out a user', () => {
    const { result, act } = renderHook(() => useAccount(), {
      wrapper: AccountProvider,
    });

    const mockUser: User = {
      id: 'abc1',
      email: 'alice@example.com',
      token: { value: 'token', type: 'Bearer', expiresIn: 1800 },
    };

    act(() => {
      result.current.signin(mockUser);
    });
    expect(result.current.user).toEqual(mockUser);

    act(() => {
      result.current.signout();
    });
    expect(result.current.user).toBeUndefined();
  });
});
