import type { Meta, StoryObj } from '@storybook/react-vite';

import AccountProvider from '@/features/account/AccountProvider';
import Signin from '@/features/account/signin/components/Signin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

const queryClient = new QueryClient();

const meta = {
  component: Signin,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AccountProvider>
            <Story />
          </AccountProvider>
        </QueryClientProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Signin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
