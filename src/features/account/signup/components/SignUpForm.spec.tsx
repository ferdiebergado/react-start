import SignupForm from '@/features/account/signup/components/SignupForm';
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
      <SignupForm />
    </QueryClientProvider>
  );
};

describe('SignUpForm', () => {
  it('signs up successfully', async () => {
    const { getByRole, getByLabelText } = renderWithProviders();

    const emailInput = getByLabelText(/email/i);
    await emailInput.fill('new@mail.com');

    const passwordInput = getByLabelText(/^password$/i);
    await passwordInput.fill('Password1!');

    const passwordConfirmInput = getByLabelText(/confirm password/i);
    await passwordConfirmInput.fill('Password1!');

    const submitBtn = getByRole('button', { name: /sign up/i });
    await submitBtn.click();

    await expect.poll(() => (toast.success as Mock).mock.calls.length).toBe(1);
    expect(toast.success).toHaveBeenCalledWith('Signup successful');
  });

  it('shows server side validation errors', async () => {
    const { getByRole, getByLabelText, getByText } = renderWithProviders();

    const emailInput = getByLabelText(/email/i);
    await emailInput.fill('exists@mail.com');

    const passwordInput = getByLabelText(/^password$/i);
    await passwordInput.fill('Password1!');

    const passwordConfirmInput = getByLabelText(/confirm password/i);
    await passwordConfirmInput.fill('Password1!');

    const submitBtn = getByRole('button', { name: /sign up/i });
    await submitBtn.click();

    await expect.element(getByText(/email already in use/i)).toBeVisible();

    await expect.poll(() => (toast.error as Mock).mock.calls.length).toBe(1);
    expect(toast.error).toHaveBeenCalledWith('Validation failed');
  });
});
