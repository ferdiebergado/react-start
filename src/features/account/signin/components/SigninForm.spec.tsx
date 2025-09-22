import Toast from '@/components/layout/Toast';
import AccountProvider from '@/features/account/AccountProvider';
import SigninForm from '@/features/account/signin/components/SigninForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

const renderWithProviders = () => {
  const client = new QueryClient();

  return render(
    <MemoryRouter>
      <QueryClientProvider client={client}>
        <AccountProvider>
          <SigninForm />
          <Toast />
        </AccountProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('SigninForm', () => {
  it('signs in successfully', async () => {
    const { getByRole, getByLabelText, getByText } = renderWithProviders();

    const emailInput = getByLabelText(/email/i);
    await emailInput.fill('exists@mail.com');

    const passwordInput = getByLabelText(/^password$/i);
    await passwordInput.fill('Password1!');

    const submitBtn = getByRole('button', { name: /sign in/i });
    await submitBtn.click();

    const toastMsg = getByText(/sign in successful/i);
    await expect.element(toastMsg).toBeVisible();
  });

  it('shows server side errors', async () => {
    const { getByRole, getByLabelText, getByText } = renderWithProviders();

    const emailInput = getByLabelText(/email/i);
    await emailInput.fill('unknown@mail.com');

    const passwordInput = getByLabelText(/^password$/i);
    await passwordInput.fill('Password1!');

    const submitBtn = getByRole('button', { name: /sign in/i });
    await submitBtn.click();

    const toastMsg = getByText(/invalid username\/password/i);
    await expect.element(toastMsg).toBeVisible();
  });
});
