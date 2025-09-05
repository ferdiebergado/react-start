import NavigationLink from '@/components/navigation/NavigationLink';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

function renderWithMenu(ui: ReactNode, initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>{ui}</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </MemoryRouter>
  );
}

describe('NavigationLink', () => {
  it('renders the NavLink component correctly', async () => {
    const { getByRole } = renderWithMenu(
      <NavigationLink to="/" end>
        Home
      </NavigationLink>
    );
    const linkElement = getByRole('link', { name: /home/i });
    await expect.element(linkElement).toBeVisible();
    await expect.element(linkElement).toHaveAttribute('href', '/');
  });

  it('sets the data-active attribute to true when the path matches', async () => {
    const { getByRole } = renderWithMenu(
      <NavigationLink to="/dashboard" end>
        Dashboard
      </NavigationLink>,
      ['/dashboard']
    );
    const linkElement = getByRole('link', { name: /dashboard/i });
    await expect.element(linkElement).toHaveAttribute('data-active');
  });

  it('sets the data-active attribute to true when the path is a subpath', async () => {
    const { getByRole } = renderWithMenu(
      <NavigationLink to="/products">Products</NavigationLink>,
      ['/products/1']
    );

    const linkElement = getByRole('link', { name: /products/i });
    await expect.element(linkElement).toHaveAttribute('data-active');
  });

  it('sets the data-active attribute to false when the path does not match', async () => {
    const { getByRole } = renderWithMenu(
      <NavigationLink to="/dashboard">Dashboard</NavigationLink>,
      ['/settings']
    );
    const linkElement = getByRole('link', { name: /dashboard/i });
    await expect.element(linkElement).not.toHaveAttribute('data-active');
  });

  it('applies the correct CSS classes when the link is active', async () => {
    const { getByRole } = renderWithMenu(
      <NavigationLink to="/">Home</NavigationLink>,
      ['/']
    );
    const linkElement = getByRole('link', { name: /home/i });
    await expect
      .element(linkElement)
      .toHaveClass(
        'data-[active]:decoration-accent-foreground',
        'data-[active]:underline',
        'data-[active]:decoration-2',
        'data-[active]:underline-offset-8'
      );
  });
});
