import type { Meta, StoryObj } from '@storybook/react-vite'

import { MemoryRouter } from 'react-router'
import Header from './Header'
import ThemeProvider from './ThemeProvider'

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
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
