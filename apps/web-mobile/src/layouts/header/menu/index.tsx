'use client';

import { Suspense, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Icon } from '@iconify/react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

import LocaleToggler from '@/components/locale-toggler';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

export function Menu() {
  const { user, logout } = useAuth0();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: 'material-symbols-light:team-dashboard-outline', route: ROUTES.PRIVATE.DASHBOARD() },
    { label: 'Reports', icon: 'ph:recycle', route: ROUTES.PRIVATE.REPORTS() },
    // { label: 'KYC', icon: 'ic:sharp-admin-panel-settings', route: ROUTES.PRIVATE.KYC() },
    // { label: 'Audits', icon: 'ic:check-circle', route: ROUTES.PRIVATE.AUDITS() },
    // { label: 'Admin', icon: 'ic:sharp-admin-panel-settings', route: ROUTES.PRIVATE.AUDITS() },
  ];

  const renderMenuItems = (mobile = false) => (
    <>
      {menuItems.map((item, index) => (
        <NavigationMenuItem key={index}>
          <Link
            className={cn(navigationMenuTriggerStyle(), mobile && 'w-full justify-start')}
            to={item.route}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
          >
            {item.label}
            <Icon icon={item.icon} width="16" height="16" className="ml-1" />
          </Link>
        </NavigationMenuItem>
      ))}
    </>
  );

  const renderProfileMenu = (mobile = false) => (
    <DropdownMenu>
      <div className="flex">
        <DropdownMenuTrigger className={cn('pl-4', mobile && 'w-full justify-start')}>
          <Avatar>
            <AvatarImage src={user?.picture ?? ''} alt="User profile" />
            <AvatarFallback className="text-xs">{user?.name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button asChild variant="link" onClick={() => mobile && setIsMobileMenuOpen(false)}>
              <Link to={ROUTES.PRIVATE.PROFILE()}>Your Profile</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              className="color-secondary color w-full text-center"
              variant="link"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Sign out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
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

      <NavigationMenuList className="hidden md:flex">
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
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        className="hover:bg-accent flex items-center rounded-md p-2"
                        to={item.route}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon icon={item.icon} width="20" height="20" className="mr-3" />
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
                <div className="flex items-center justify-between">
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
