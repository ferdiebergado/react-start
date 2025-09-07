import AccountProvider from '@/features/account/AccountProvider';
import SignUp from '@/features/account/signup/components/SignUp';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

const meta = {
  component: SignUp,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AccountProvider>
          <Story />
        </AccountProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof SignUp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
