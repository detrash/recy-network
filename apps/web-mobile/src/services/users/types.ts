import { User } from '@/entities/user';

export interface ValidateUserResponse {
  userExists: boolean;
  user: User;
}

export interface ValidateUserBody {
  email: string;
  name: string;
  picture?: string;
  authId: string;
  authProvider: string;
}
