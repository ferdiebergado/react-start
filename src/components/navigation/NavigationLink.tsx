import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { type FC } from 'react';
import { NavLink, useMatch, type NavLinkProps } from 'react-router';

const NavigationLink: FC<
  NavLinkProps & React.RefAttributes<HTMLAnchorElement>
> = ({ to, ...props }) => {
  const toPath = typeof to === 'string' ? to : (to.pathname ?? '/');
  const match = useMatch(toPath.endsWith('/*') ? toPath : `${toPath}/*`);

  return (
    <NavigationMenuLink asChild active={!!match}>
      <NavLink
        to={to}
        {...props}
        className="data-[active]:decoration-accent-foreground no-underline data-[active]:underline data-[active]:decoration-2 data-[active]:underline-offset-8"
      />
    </NavigationMenuLink>
  );
};

export default NavigationLink;
