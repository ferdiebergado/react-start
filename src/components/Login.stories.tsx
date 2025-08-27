import type { Meta, StoryObj } from '@storybook/react-vite'

import { MemoryRouter } from 'react-router'
import AuthProvider from './AuthProvider'
import Login from './Login'

const meta = {
    component: Login,
    decorators: [
        (Story) => (
            <AuthProvider>
                <MemoryRouter>
                    <Story />
                </MemoryRouter>
            </AuthProvider>
        ),
    ],
} satisfies Meta<typeof Login>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}
