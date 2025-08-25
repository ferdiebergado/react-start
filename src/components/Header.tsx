import ModeToggle from '@/components/ModeToggle'
import NavigationLink from '@/components/NavigationLink'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import type { FC } from 'react'

const Header: FC = () => {
    return (
        <header className="px-12 py-3 shadow-md dark:shadow-gray-600">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationLink to="/" end>
                            Home
                        </NavigationLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationLink to="/about" end>
                            About
                        </NavigationLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <ModeToggle />
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    )
}

export default Header
