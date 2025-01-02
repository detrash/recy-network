import { Suspense, useState } from 'react';
import { Icon } from '@iconify/react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Link, useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';

import LocaleToggler from '@/components/locale-toggler';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ROUTES } from '@/config/routes';
import { cn } from '@/utils/cn';
import { useAuth } from '@/hooks/auth';
import { Skeleton } from '@/components/ui/skeleton';

import { ProfileMenu } from './profile-menu';

export function Menu() {
  const { user, logout, hasAuditorRole, hasAdminPrivileges, isLoading: isLoadingAuth } = useAuth();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', route: ROUTES.PRIVATE.DASHBOARD() },
    { label: 'Reports', route: ROUTES.PRIVATE.REPORTS() },
    { label: 'Audits', route: ROUTES.PRIVATE.AUDITS() },
  ];

  const renderMenuItems = (mobile = false) => (
    <>
      {menuItems.map((item) => {
        if (isLoadingAuth) return <Skeleton className="h-[40px] w-[100px] rounded-sm" />;

        const isAuditsRoute = item.route === ROUTES.PRIVATE.AUDITS();
        const isUnauthorized = !hasAuditorRole && !hasAdminPrivileges;

        if (isAuditsRoute && isUnauthorized) return null;

        return (
          <NavigationMenuItem key={item.route}>
            <Link
              className={cn(
                navigationMenuTriggerStyle(),
                mobile && 'w-full justify-start',
                location.pathname.toLowerCase() === item.route.toLowerCase() && 'bg-accent'
              )}
              to={item.route}
              onClick={() => mobile && setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavigationMenuItem>
        );
      })}
    </>
  );

  const renderProfileMenu = (mobile = false) => (
    <ProfileMenu
      user={user}
      logout={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      mobile={mobile}
      onMobileMenuClose={() => setIsMobileMenuOpen(false)}
    />
  );

  return (
    <NavigationMenu className="flex min-w-full justify-between">
      <NavigationMenuList className="hidden md:flex">
        <NavigationMenuItem>
          <Link to={ROUTES.PUBLIC.HOME()}>
            <img src="/assets/brand/recy-logo.png" width={64} height={64} alt="Recy Logo" className="mr-4" />
          </Link>
        </NavigationMenuItem>
        {renderMenuItems()}
      </NavigationMenuList>

      <NavigationMenuList className="hidden items-center justify-between gap-2 md:flex">
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn('hover:cursor-pointer', navigationMenuTriggerStyle())}
            onClick={() => open()}
          >
            {isConnected && address ? <p>{`${address.slice(0, 4)}...${address.slice(-4)}`}</p> : 'Connect Wallet'}
            <Icon icon="ph:wallet-thin" width="16" height="16" className="ml-1 text-green-800" />
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Suspense>
            <LocaleToggler />
          </Suspense>
        </NavigationMenuItem>

        <NavigationMenuItem>{renderProfileMenu()}</NavigationMenuItem>
      </NavigationMenuList>

      {/* Mobile Menu */}
      <div className="flex w-full items-center justify-between md:hidden">
        <Link to={ROUTES.PUBLIC.HOME()}>
          <img src="/assets/brand/recy-logo.png" width={48} height={48} alt="Recy Logo" />
        </Link>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="p-0">
              <Icon icon="mdi:menu" className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0 sm:w-[400px]">
            <div className="flex h-full flex-col">
              <div className="border-b p-4">
                <Link to={ROUTES.PUBLIC.HOME()} onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/assets/brand/recy-logo.png" width={64} height={64} alt="Recy Logo" className="mx-auto" />
                </Link>
              </div>
              <nav className="flex-grow overflow-y-auto">
                <ul className="space-y-2 px-2 py-4">
                  {menuItems.map((item) => (
                    <li key={item.route}>
                      <Link
                        className="hover:bg-accent flex items-center rounded-md p-2"
                        to={item.route}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <footer className="space-y-4 border-t p-4">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => {
                    open();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Icon icon="ph:wallet-thin" width="20" height="20" className="mr-3" />
                  {isConnected && address ? `${address.slice(0, 4)}...${address.slice(-4)}` : 'Connect Wallet'}
                </Button>
                <div className="flex w-full items-center justify-between">
                  <LocaleToggler />
                  {renderProfileMenu(true)}
                </div>
              </footer>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </NavigationMenu>
  );
}
