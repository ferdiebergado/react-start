import type { Meta, StoryObj } from '@storybook/react-vite'

import { MemoryRouter } from 'react-router'
import AuthProvider from './AuthProvider'
import SignUp from './SignUp'

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
