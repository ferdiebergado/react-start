import type { Meta, StoryObj } from '@storybook/react-vite';

import AccountProvider from '@/features/account/AccountProvider';
import Signin from '@/features/account/components/Signin';
import { MemoryRouter } from 'react-router';

const meta = {
  component: Signin,
  decorators: [
    (Story) => (
      <AccountProvider>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </AccountProvider>
    ),
  ],
} satisfies Meta<typeof Signin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
