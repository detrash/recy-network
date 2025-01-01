import { Roles } from '@/constants/index';
import { UserRole } from '@/entities/user';
import { Role } from '@/types/roles';

export const validateAuthProvider = (sub: string): string | null => {
  const [authProvider] = sub.split('|');
  const validProviders = ['google-oauth2'];

  if (validProviders.includes(authProvider)) {
    return authProvider;
  }

  return null;
};

export function isAdmin(roles: UserRole[] | undefined): boolean {
  if (!roles) return false;
  return roles.some((userRole) => userRole.role.name === Roles.ADMIN);
}

export function isNewUser(roles: UserRole[] | undefined): boolean {
  if (!roles) return false;
  return roles.some((userRole) => userRole.role.name === Roles.NEW_USER);
}

export function isRole(roles: UserRole[] | undefined, checkRole: Role): boolean {
  if (!roles) return false;
  return roles.some((userRole) => userRole.role.name === checkRole);
}
