import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { type FC } from 'react'
import { NavLink, useLocation, type NavLinkProps } from 'react-router'

const NavigationLink: FC<
    NavLinkProps & React.RefAttributes<HTMLAnchorElement>
> = ({ to, ...props }) => {
    const { pathname } = useLocation()
    const isActive = pathname === to

    return (
        <NavigationMenuLink asChild active={isActive}>
            <NavLink to={to} {...props} />
        </NavigationMenuLink>
    )
}

export default NavigationLink
