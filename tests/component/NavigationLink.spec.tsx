import NavigationLink from '@/components/NavigationLink'
import { Link } from '@radix-ui/react-navigation-menu'
import { cloneElement, isValidElement, type ComponentProps } from 'react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'

vi.mock('@/components/ui/navigation-menu', () => {
    return {
        NavigationMenuLink: ({
            active,
            children,
            ...props
        }: ComponentProps<typeof Link>) => {
            if (isValidElement(children)) {
                return (
                    <div>
                        {cloneElement(children, {
                            'data-active': active ? 'true' : 'false',
                            ...props,
                        })}
                    </div>
                )
            }
            return <div>{children}</div>
        },
    }
})

describe('NavigationLink', () => {
    it('renders the NavLink component correctly', async () => {
        const { getByRole } = render(
            <MemoryRouter>
                <NavigationLink to="/about">About</NavigationLink>
            </MemoryRouter>
        )
        const linkElement = getByRole('link', { name: /about/i })
        await expect.element(linkElement).toBeVisible()
        expect(linkElement).toHaveAttribute('href', '/about')
    })

    it('sets the data-active attribute to true when the path matches', async () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={['/dashboard']}>
                <NavigationLink to="/dashboard">Dashboard</NavigationLink>
            </MemoryRouter>
        )
        const linkElement = getByRole('link', { name: /dashboard/i })
        await expect.element(linkElement).toHaveAttribute('data-active', 'true')
    })

    it('sets the data-active attribute to true when the path is a subpath', async () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={['/products/1']}>
                <NavigationLink to="/products">Products</NavigationLink>
            </MemoryRouter>
        )

        const linkElement = getByRole('link', { name: /products/i })
        await expect.element(linkElement).toHaveAttribute('data-active', 'true')
    })

    it('sets the data-active attribute to false when the path does not match', async () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={['/settings']}>
                <NavigationLink to="/dashboard">Dashboard</NavigationLink>
            </MemoryRouter>
        )
        const linkElement = getByRole('link', { name: /dashboard/i })
        await expect
            .element(linkElement)
            .toHaveAttribute('data-active', 'false')
    })

    it('applies the correct CSS classes when the link is active', async () => {
        const { getByRole } = render(
            <MemoryRouter initialEntries={['/home']}>
                <NavigationLink to="/home">Home</NavigationLink>
            </MemoryRouter>
        )
        const linkElement = getByRole('link', { name: /home/i })
        await expect
            .element(linkElement)
            .toHaveClass(
                'data-[active]:decoration-accent-foreground',
                'data-[active]:underline',
                'data-[active]:decoration-2',
                'data-[active]:underline-offset-8'
            )
    })
})
