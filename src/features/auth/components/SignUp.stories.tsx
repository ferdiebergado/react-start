import type { Meta, StoryObj } from '@storybook/react-vite'

import AuthProvider from '@/features/auth/AuthProvider'
import SignUp from '@/features/auth/components/SignUp'
import { MemoryRouter } from 'react-router'

const meta = {
    component: SignUp,
    decorators: [
        (Story) => (
            <AuthProvider>
                <MemoryRouter>
                    <Story />
                </MemoryRouter>
            </AuthProvider>
        ),
    ],
} satisfies Meta<typeof SignUp>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
