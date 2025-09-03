import type { Meta, StoryObj } from '@storybook/react-vite';

import AccountProvider from '@/features/account/AccountProvider';
import SignUp from '@/features/account/components/SignUp';
import { MemoryRouter } from 'react-router';

const meta = {
  component: SignUp,
  decorators: [
    (Story) => (
      <AccountProvider>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </AccountProvider>
    ),
  ],
} satisfies Meta<typeof SignUp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
