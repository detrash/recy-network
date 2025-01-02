import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ROUTES } from '@/config/routes';
import { cn } from '@/utils/cn';

interface ProfileMenuProps {
  user: {
    name?: string;
    picture?: string;
    email?: string;
  };
  logout: () => void;
  mobile?: boolean;
  onMobileMenuClose?: () => void;
}

export function ProfileMenu({ user, logout, mobile = false, onMobileMenuClose }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);

  const handleMenuItemClick = () => {
    setOpen(false);
    if (mobile && onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative flex h-8 w-8 items-center rounded-full">
          <Avatar className="h-8 w-8">
            {user?.picture && <AvatarImage src={user.picture} alt={user?.name || 'User avatar'} />}
            <AvatarFallback>{user?.name?.charAt(0) || ''}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align={mobile ? 'center' : 'end'} forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-muted-foreground text-xs leading-none">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              to={ROUTES.PRIVATE.PROFILE()}
              className="flex w-full cursor-pointer items-center"
              onClick={handleMenuItemClick}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to={ROUTES.PRIVATE.PROFILE()}
              className="flex w-full cursor-pointer items-center"
              onClick={handleMenuItemClick}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex w-full cursor-pointer items-center text-red-500 focus:text-red-500"
          onClick={() => {
            logout();
            handleMenuItemClick();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
