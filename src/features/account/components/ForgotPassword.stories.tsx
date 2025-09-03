import type { Meta, StoryObj } from '@storybook/react-vite';

import ForgotPassword from '@/features/account/components/ForgotPassword';

const meta = {
  component: ForgotPassword,
} satisfies Meta<typeof ForgotPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
