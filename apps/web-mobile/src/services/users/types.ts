import { Material, Materials } from '@/entities/report';
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
export interface Report {
  id: string;
  reportDate: string;
  materials: Materials;
  audited: boolean;
  residueEvidence: string;
  metadata: Record<string, unknown>;
}

interface MonthlyChanges {
  residueKgs: {
    percentageChange: number;
    changeType: 'increase' | 'decrease';
  };
  reports: {
    percentageChange: number;
    changeType: 'increase' | 'decrease';
  };
}

export interface UserStatsResponse {
  totalReports: number;
  lastsReports: Report[];
  totalResidueKg: number;
  materials: Material;
  monthlyChanges: MonthlyChanges;
}
