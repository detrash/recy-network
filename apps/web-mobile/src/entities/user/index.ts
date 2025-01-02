import { RecyclingReport } from '@/entities/report';

export interface Role {
  id: string;
  name: string;
}

export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  role: Role;
}

export type User = {
  phone?: string | null;
  walletAddress?: string | null;
  id: string;
  name: string;
  email: string;
  authProvider: string | null;
  authId: string | null;
  picture: string | null;
  createdAt: string;
  updatedAt: string;
  recyclingReports?: RecyclingReport[];
  userRoles?: UserRole[];
};
