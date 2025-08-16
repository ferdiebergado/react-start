import Layout from '@/components/Layout'
import { createRoutesStub } from 'react-router'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'

it.concurrent('renders the layout', async () => {
    const Stub = createRoutesStub([
        {
            path: '/',
            Component: Layout,
        },
    ])

    const { getByRole, getByText } = render(<Stub initialEntries={['/']} />)

    const nav = getByRole('navigation')
    await expect.element(nav).toBeVisible()

    const main = getByRole('main')
    await expect.element(main).toBeInTheDocument()

    const footer = getByText(/2025 by ferdie bergado/i)
    await expect.element(footer).toBeVisible()
})
