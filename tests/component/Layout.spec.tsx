import { createRoutesStub } from 'react-router'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import Home from '../../src/components/Home'
import Layout from '../../src/components/Layout'

it('renders the layout', async () => {
    const Stub = createRoutesStub([
        {
            path: '/',
            Component: Layout,
            children: [{ index: true, Component: Home }],
        },
    ])

    const { getByRole, getByText } = render(<Stub initialEntries={['/']} />)

    const nav = getByRole('navigation')
    await expect.element(nav).toBeVisible()

    const main = getByRole('main')
    await expect.element(main).toBeInTheDocument()
    const heading = main.getByRole('heading')
    expect(heading).toBeVisible()
    expect(heading).toHaveTextContent(/welcome/i)

    const footer = getByText(/2025 by ferdie bergado/i)
    await expect.element(footer).toBeVisible()
})
