import { type FC } from 'react'
import { NavLink, useLocation, type NavLinkProps } from 'react-router'
import { NavigationMenuLink } from './ui/navigation-menu'

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
