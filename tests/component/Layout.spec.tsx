import Layout from '@/components/Layout'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'

describe('Layout', () => {
    it.concurrent('renders the layout', async () => {
        const { getByText, getByRole } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route index element={<Layout />} />
                </Routes>
            </MemoryRouter>
        )

        const nav = getByRole('navigation')
        await expect.element(nav).toBeVisible()

        const main = getByRole('main')
        await expect.element(main).toBeInTheDocument()

        const year = new Date().getFullYear()
        const footer = getByText(year.toString())
        await expect.element(footer).toBeVisible()
    })
})
