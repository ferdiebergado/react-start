import type { Meta, StoryObj } from '@storybook/react-vite';

import NavigationLink from '@/components/navigation/NavigationLink';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { MemoryRouter } from 'react-router';

const meta = {
  component: NavigationLink,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Story />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof NavigationLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { to: '/', children: 'Home' },
};
