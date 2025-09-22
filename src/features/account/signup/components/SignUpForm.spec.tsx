import Toast from '@/components/layout/Toast';
import SignupForm from '@/features/account/signup/components/SignupForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

const renderWithProviders = () => {
  const client = new QueryClient();

  return render(
    <QueryClientProvider client={client}>
      <SignupForm />
      <Toast />
    </QueryClientProvider>
  );
};

describe('SignUpForm', () => {
  it('signs up successfully', async () => {
    const { getByRole, getByLabelText, getByText } = renderWithProviders();

    const emailInput = getByLabelText(/email/i);
    await emailInput.fill('new@mail.com');

    const passwordInput = getByLabelText(/^password$/i);
    await passwordInput.fill('Password1!');

    const passwordConfirmInput = getByLabelText(/confirm password/i);
    await passwordConfirmInput.fill('Password1!');

    const submitBtn = getByRole('button', { name: /sign up/i });
    await submitBtn.click();

    const toastMsg = getByText(/signup successful/i);
    await expect.element(toastMsg).toBeVisible();
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

    const toastMsg = getByText(/validation failed/i);
    await expect.element(toastMsg).toBeVisible();
  });
});
