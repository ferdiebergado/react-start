import type { Meta, StoryObj } from '@storybook/react-vite';

import ResetPassword from '@/features/account/reset-password/components/ResetPassword';

const meta = {
  component: ResetPassword,
} satisfies Meta<typeof ResetPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
