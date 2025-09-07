import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { toast } from 'sonner';
import { describe, expect, it, vi, type Mock } from 'vitest';
import { render } from 'vitest-browser-react';
import AccountProvider from '../../AccountProvider';
import SigninForm from './SigninForm';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: vi.fn(),
}));

const renderWithProviders = (ui: ReactNode) => {
  const client = new QueryClient();

  return render(
    <MemoryRouter>
      <QueryClientProvider client={client}>
        <AccountProvider>{ui}</AccountProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('SigninForm', () => {
  it('signs in successfully', async () => {
    const { getByRole, getByLabelText } = renderWithProviders(<SigninForm />);

    const emailInput = getByLabelText(/email/i);
    await emailInput.fill('exists@mail.com');

    const passwordInput = getByLabelText(/^password$/i);
    await passwordInput.fill('Password1!');

    const submitBtn = getByRole('button', { name: /sign in/i });
    await submitBtn.click();

    await expect.poll(() => (toast.success as Mock).mock.calls.length).toBe(1);
    expect(toast.success).toHaveBeenCalledWith('Sign in successful');
  });

  it('shows server side validation errors', async () => {
    const { getByRole, getByLabelText, getByText } = renderWithProviders(
      <SigninForm />
    );

    const emailInput = getByLabelText(/email/i);
    await emailInput.fill('unknown@mail.com');

    const passwordInput = getByLabelText(/^password$/i);
    await passwordInput.fill('Password1!');

    const submitBtn = getByRole('button', { name: /sign in/i });
    await submitBtn.click();

    await expect.poll(() => (toast.error as Mock).mock.calls.length).toBe(1);
    expect(toast.error).toHaveBeenCalledWith('Invalid username/password');
  });
});
