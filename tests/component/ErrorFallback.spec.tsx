import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'

import ErrorFallback from '@/components/ErrorFallback'

describe('FallbackRender', () => {
    afterEach(() => {
        cleanup()
    })

    it('renders the error message and a "Try again" button', async () => {
        const mockError = new Error('Test error message')
        const mockResetErrorBoundary = vi.fn()

        const { getByRole, getByText } = render(
            <ErrorFallback
                error={mockError}
                resetErrorBoundary={mockResetErrorBoundary}
            />
        )

        await expect
            .element(
                getByRole('heading', {
                    name: /Something went wrong./i,
                })
            )
            .toBeVisible()

        expect(getByText(/Test error message/i)).toBeVisible()

        const button = getByRole('button', {
            name: /Try again/i,
        })
        expect(button).toBeVisible()

        await button.click()
        expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1)
    })
})
