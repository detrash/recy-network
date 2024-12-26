import { RecyclingReport } from '@/entities/report';

export type User = {
  phone: string | null;
  walletAddress: string | null;
  id: string;
  name: string;
  email: string;
  authProvider: string | null;
  authId: string | null;
  picture: string | null;
  createdAt: Date;
  updatedAt: Date;
  recyclingReports: RecyclingReport[];
};
