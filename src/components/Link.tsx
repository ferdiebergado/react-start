import { NavLink, useNavigation, type NavLinkProps } from 'react-router'
import { NavigationMenuLink } from './ui/navigation-menu'

export default function Link({ to, ...props }: NavLinkProps) {
    const { location } = useNavigation()
    const isActive = to === location?.pathname

    return (
        <NavigationMenuLink asChild active={isActive}>
            <NavLink to={to} {...props} />
        </NavigationMenuLink>
    )
}
