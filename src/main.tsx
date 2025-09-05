import App from '@/App';
import ErrorFallback from '@/components/error/ErrorFallback';
import AccountProvider from '@/features/account/AccountProvider';
import ThemeProvider from '@/features/theme/ThemeProvider';
import '@/index.css';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router';

const queryClient = new QueryClient();

const root = document.getElementById('root');
if (!root) {
  throw new Error('root element not found');
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
              <ThemeProvider>
                <AccountProvider>
                  <App />
                </AccountProvider>
              </ThemeProvider>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
