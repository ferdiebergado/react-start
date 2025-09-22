import Toast from '@/components/layout/Toast';
import AccountProvider from '@/features/account/AccountProvider';
import ForgotPasswordForm from '@/features/account/forgot-password/components/ForgotPasswordForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

const renderWithProviders = () => {
  const client = new QueryClient();

  return render(
    <QueryClientProvider client={client}>
      <AccountProvider>
        <ForgotPasswordForm />
        <Toast />
      </AccountProvider>
    </QueryClientProvider>
  );
};

describe('ForgotPasswordForm', () => {
  it('sends reset link successfully', async () => {
    const { getByRole, getByLabelText, getByText } = renderWithProviders();

    const emailInput = getByLabelText(/email/i);
    await emailInput.fill('exists@mail.com');

    const submitBtn = getByRole('button', { name: /send reset link/i });
    await submitBtn.click();

    const toastMsg = getByText(/password reset link sent successfully/i);
    await expect.element(toastMsg).toBeVisible();
  });

  it('shows server side validation errors', async () => {
    const { getByRole, getByLabelText, getByText } = renderWithProviders();

    const emailInput = getByLabelText(/email/i);
    await emailInput.fill('invalid@mail.com');

    const submitBtn = getByRole('button', { name: /send reset link/i });
    await submitBtn.click();

    const emailErr = getByText(/email is not a valid email address/i);
    await expect.element(emailErr).toBeVisible();

    const toastMsg = getByText(/invalid input/i);
    await expect.element(toastMsg).toBeVisible();
  });
});
