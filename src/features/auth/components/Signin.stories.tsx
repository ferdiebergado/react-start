import type { Meta, StoryObj } from '@storybook/react-vite';

import AuthProvider from '@/features/auth/AuthProvider';
import Signin from '@/features/auth/components/Signin';
import { MemoryRouter } from 'react-router';

const meta = {
  component: Signin,
  decorators: [
    (Story) => (
      <AuthProvider>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </AuthProvider>
    ),
  ],
} satisfies Meta<typeof Signin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
