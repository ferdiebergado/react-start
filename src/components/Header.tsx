import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import type { FC } from 'react'
import Link from './Link'
import ModeToggle from './ModeToggle'

const Header: FC = () => {
    return (
        <header className="px-12 py-3 shadow-md">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link to="/" end>
                            Home
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/about" end>
                            About
                        </Link>
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
