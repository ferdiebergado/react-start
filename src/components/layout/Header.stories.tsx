import type { Meta, StoryObj } from '@storybook/react-vite';

import Header from '@/components/layout/Header';
import ThemeProvider from '@/features/theme/ThemeProvider';
import { MemoryRouter } from 'react-router';

const meta = {
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
