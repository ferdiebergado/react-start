import Toast from '@/components/layout/Toast';
import ResetPasswordForm from '@/features/account/reset-password/components/ResetPasswordForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

const renderWithProviders = () => {
  const client = new QueryClient();

  return render(
    <QueryClientProvider client={client}>
      <ResetPasswordForm />
      <Toast />
    </QueryClientProvider>
  );
};

describe('ResetPasswordForm', () => {
  it('resets password successfully', async () => {
    const { getByRole, getByLabelText, getByText } = renderWithProviders();

    const passwordInput = getByLabelText(/^new password$/i);
    await passwordInput.fill('Password1!');

    const passwordConfirmInput = getByLabelText(/confirm password/i);
    await passwordConfirmInput.fill('Password1!');

    const submitBtn = getByRole('button', { name: /reset password/i });
    await submitBtn.click();

    const toastMsg = getByText(/password reset successful/i);
    await expect.element(toastMsg).toBeVisible();
  });

  it('shows server side validation errors', async () => {
    const { getByRole, getByLabelText, getByText } = renderWithProviders();

    const passwordInput = getByLabelText(/^new password$/i);
    await passwordInput.fill('Password2');

    const passwordConfirmInput = getByLabelText(/confirm password/i);
    await passwordConfirmInput.fill('Password2');

    const submitBtn = getByRole('button', { name: /reset password/i });
    await submitBtn.click();

    await expect.element(getByText(/passwords do not match/i)).toBeVisible();

    const toastMsg = getByText(/invalid input/i);
    await expect.element(toastMsg).toBeVisible();
  });
});
