import NavigationLink from '@/components/navigation/NavigationLink';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useAccount } from '@/features/account';
import Signout from '@/features/account/signout/Signout';
import ModeToggle from '@/features/theme/ModeToggle';
import type { FC } from 'react';

const Header: FC = () => {
  const { user } = useAccount();

  return (
    <header className="dark:shadow-accent-foreground mb-16 flex justify-between px-12 py-2 shadow-md">
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
      {user && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{user.email}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[150px] gap-4">
                  <li>
                    <Signout />
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </header>
  );
};

export default Header;
