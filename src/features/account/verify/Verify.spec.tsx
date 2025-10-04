import Toast from '@/components/layout/Toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import Verify from './Verify';

const MockSignIn = () => <h1>Sign in to your account</h1>;

function renderWithProvider(token = '') {
  const client = new QueryClient();

  return render(
    <MemoryRouter initialEntries={[`/verify?token=${token}`]}>
      <QueryClientProvider client={client}>
        <Routes>
          <Route path="/verify" element={<Verify />} />
          <Route path="/account/signin" element={<MockSignIn />} />
        </Routes>
        <Toast />
      </QueryClientProvider>
    </MemoryRouter>
  );
}

describe('<Verify />', () => {
  it('should show success message and redirect to the sign in page when token is valid', async () => {
    const { getByText } = renderWithProvider('valid_token');

    const toastMsg = getByText(/verification complete\. you can now login\./i);
    await expect.element(toastMsg).toBeVisible();

    const signInHeading = getByText(/sign in to your account/i);
    await expect.element(signInHeading).toBeVisible();
  });

  it('should show page not found when there is no token', async () => {
    const { getByText } = renderWithProvider();

    const text = getByText(/page not found/i);
    await expect.element(text).toBeVisible();
  });

  it('should show spinner while verifying', () => {
    const { getByRole } = renderWithProvider('valid_token');

    const status = getByRole('status');
    expect(status).toBeTruthy();
  });

  it('should show error message on failure', async () => {
    const { getByText } = renderWithProvider('expired_token');

    const errMsg = getByText(/invalid username\/password/i);
    await expect.element(errMsg).toBeVisible();
  });
});
