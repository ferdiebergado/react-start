import ErrorFallback from '@/components/error/ErrorFallback';
import Home from '@/Home';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { delay, http, HttpResponse } from 'msw';
import { ErrorBoundary } from 'react-error-boundary';

const meta = {
  component: Home,
  decorators: [
    (Story) => (
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: { queries: { retry: 0 } },
          })
        }
      >
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
              <Story />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockQuote = {
  id: 1,
  quote: 'Stay hungry, stay foolish.',
  author: 'Steve Jobs',
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://dummyjson.com/quotes/random', () => {
          return HttpResponse.json(mockQuote);
        }),
      ],
    },
  },
};

export const ServerError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://dummyjson.com/quotes/random', async () => {
          await delay(800);
          return new HttpResponse(undefined, {
            status: 503,
          });
        }),
      ],
    },
  },
};
