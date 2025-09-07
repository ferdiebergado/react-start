import ResetPasswordForm from '@/features/account/reset-password/components/ResetPasswordForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'sonner';
import { describe, expect, it, vi, type Mock } from 'vitest';
import { render } from 'vitest-browser-react';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: vi.fn(),
}));

const renderWithProviders = () => {
  const client = new QueryClient();

  return render(
    <QueryClientProvider client={client}>
      <ResetPasswordForm />
    </QueryClientProvider>
  );
};

describe('ResetPasswordForm', () => {
  it('resets password successfully', async () => {
    const { getByRole, getByLabelText } = renderWithProviders();

    const passwordInput = getByLabelText(/^new password$/i);
    await passwordInput.fill('Password1!');

    const passwordConfirmInput = getByLabelText(/confirm password/i);
    await passwordConfirmInput.fill('Password1!');

    const submitBtn = getByRole('button', { name: /reset password/i });
    await submitBtn.click();

    await expect.poll(() => (toast.success as Mock).mock.calls.length).toBe(1);
    expect(toast.success).toHaveBeenCalledWith('Password reset successful');
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

    await expect.poll(() => (toast.error as Mock).mock.calls.length).toBe(1);
    expect(toast.error).toHaveBeenCalledWith('Invalid input');
  });
});
