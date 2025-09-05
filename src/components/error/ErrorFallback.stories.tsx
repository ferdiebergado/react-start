import type { Meta, StoryObj } from '@storybook/react-vite';

import ErrorFallback from '@/components/error/ErrorFallback';
import { fn } from 'storybook/internal/test';

const meta = {
  component: ErrorFallback,
} satisfies Meta<typeof ErrorFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { error: undefined, resetErrorBoundary: fn() },
};

export const WithError: Story = {
  args: {
    error: new Error('Internal Server Error'),
    resetErrorBoundary: fn(),
  },
};

export const WithStringError: Story = {
  args: { error: 'Network request failed.', resetErrorBoundary: fn() },
};
