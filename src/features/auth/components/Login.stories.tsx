import type { Meta, StoryObj } from '@storybook/react-vite'

import AuthProvider from '@/features/auth/AuthProvider'
import Login from '@/features/auth/components/Login'
import { MemoryRouter } from 'react-router'

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
