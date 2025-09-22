import ErrorFallback from '@/components/error/ErrorFallback';
import Toast from '@/components/layout/Toast';
import AccountProvider from '@/features/account/AccountProvider';
import ThemeProvider from '@/features/theme/ThemeProvider';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import type { FC, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router';

const queryClient = new QueryClient();

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
              <ThemeProvider>
                <AccountProvider>
                  {children}
                  <Toast />
                </AccountProvider>
              </ThemeProvider>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
