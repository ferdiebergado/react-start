import Home from '@/Home'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'

it('shows welcome', async () => {
    const { getByRole } = render(<Home />)

    const heading = getByRole('heading')

    await expect.element(heading).toBeVisible()
    await expect.element(heading).toHaveTextContent('Welcome')
})
