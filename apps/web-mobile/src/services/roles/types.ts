import { Roles as RolesConst } from '@/constants/index';

export type Role = {
  id: string;
  name: (typeof RolesConst)[keyof typeof RolesConst];
};
export type Roles = Role[];

export interface RolesResponse {
  roles: Roles;
}
