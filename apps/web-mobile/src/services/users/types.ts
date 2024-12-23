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
interface Report {
  id: string;
  reportDate: string;
  materials: Material[];
  audited: boolean;
  residueEvidence: string;
  metadata: Record<string, unknown>;
}

interface Material {
  weightKg: number;
  materialType: 'PLASTIC' | 'METAL' | 'GLASS' | 'ORGANIC' | 'PAPER' | 'TEXTILE' | 'LANDFILL_WASTE';
}

interface ResidueMaterialWeights {
  GLASS: number;
  METAL: number;
  ORGANIC: number;
  PAPER: number;
  PLASTIC: number;
  TEXTILE: number;
  LANDFILL_WASTE: number;
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
  residueMaterialWeights: ResidueMaterialWeights;
  monthlyChanges: MonthlyChanges;
}
