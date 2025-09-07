import AccountProvider from '@/features/account/AccountProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { describe, expect, it, vi, type Mock } from 'vitest';
import { render } from 'vitest-browser-react';
import ForgotPasswordForm from './ForgotPasswordForm';

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
    <QueryClientProvider client={client}>
      <AccountProvider>{ui}</AccountProvider>
    </QueryClientProvider>
  );
};

describe('ForgotPasswordForm', () => {
  it('sends reset successfully', async () => {
    const { getByRole, getByLabelText } = renderWithProviders(
      <ForgotPasswordForm />
    );

    const emailInput = getByLabelText(/email/i);
    await emailInput.fill('exists@mail.com');

    const submitBtn = getByRole('button', { name: /send reset link/i });
    await submitBtn.click();

    await expect.poll(() => (toast.success as Mock).mock.calls.length).toBe(1);
    expect(toast.success).toHaveBeenCalledWith(
      'Password reset link sent successfully'
    );
  });

  it('shows server side validation errors', async () => {
    const { getByRole, getByLabelText, getByText } = renderWithProviders(
      <ForgotPasswordForm />
    );

    const emailInput = getByLabelText(/email/i);
    await emailInput.fill('invalid@mail.com');

    const submitBtn = getByRole('button', { name: /send reset link/i });
    await submitBtn.click();

    const emailErr = getByText(/email is not a valid email address/i);
    await expect.element(emailErr).toBeVisible();

    await expect.poll(() => (toast.error as Mock).mock.calls.length).toBe(1);
    expect(toast.error).toHaveBeenCalledWith('Invalid input');
  });
});
