import { useUserById } from '@/services/users';
import { isAdmin, isNewUser } from '@/utils/auth';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocalStorage } from 'usehooks-ts';

export const useAuth = () => {
  const auth0 = useAuth0();

  const { user: auth0User, isLoading: auth0Isloading, ...auth0Rest } = auth0;

  const [storedUser] = useLocalStorage('@recy-network/user', { id: '' });

  const userId = auth0User?.user_metadata?.id || storedUser.id;

  const { data: user, isLoading: isUserLoading } = useUserById(auth0.isAuthenticated ? userId : false);

  const hasNewUserRole = user?.userRoles ? isNewUser(user.userRoles) : false;
  const hasAdminPrivileges = user?.userRoles ? isAdmin(user.userRoles) : false;

  const isLoading = auth0Isloading || isUserLoading;

  return {
    user,
    hasNewUserRole,
    hasAdminPrivileges,
    isLoading,
    ...auth0Rest,
  };
};
