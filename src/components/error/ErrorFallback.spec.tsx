import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

import ErrorFallback from '@/components/error/ErrorFallback';

describe('ErrorFallback', () => {
  it('renders the error message and a "Try again" button', async () => {
    const mockError = new Error('Test error message');
    const mockResetErrorBoundary = vi.fn();

    const { getByRole } = render(
      <ErrorFallback
        error={mockError}
        resetErrorBoundary={mockResetErrorBoundary}
      />
    );

    const heading = getByRole('heading', {
      name: /Something went wrong./i,
    });
    await expect.element(heading).toBeVisible();

    const retryBtn = getByRole('button', {
      name: /Try again/i,
    });
    await expect.element(retryBtn).toBeVisible();

    await retryBtn.click();
    expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1);
  });
});
