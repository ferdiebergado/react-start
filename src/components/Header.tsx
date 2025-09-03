import ModeToggle from '@/components/ModeToggle';
import NavigationLink from '@/components/NavigationLink';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { paths } from '@/routes';
import type { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="dark:shadow-accent-foreground mb-16 px-12 py-2 shadow-md">
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
            <NavigationLink to={paths.signup} end>
              Sign Up
            </NavigationLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationLink to={paths.signin} end>
              Login
            </NavigationLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
