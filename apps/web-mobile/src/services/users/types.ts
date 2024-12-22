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

type Material = {
  weightKg: number;
  materialType: 'PLASTIC' | 'METAL' | 'GLASS' | 'ORGANIC' | 'PAPER' | 'TEXTILE' | 'LANDFILL_WASTE';
};

interface Report {
  id: string;
  reportDate: string;
  materials: Material[];
  audited: boolean;
  residueEvidence: string;
}

interface Token {
  data: {
    symbol: string;
    price: {
      usd: number;
      btc: number;
      eth: number;
    };
    totalSupply: number;
    marketCap: number;
    circulatingSupply: number;
    volume24h: number;
    decimals: number;
    allTimeHigh: number;
  };
  wallet: {
    address: string;
    balance: {
      crecy: number;
      usdValue: number;
    };
    transactions: {
      pending: number;
      confirmed: number;
    };
  };
  status: string;
  timestamp: string;
}

export interface ResidueReportResponse {
  totalReports: number;
  lastsReports: Report[];
  totalResidueKg: string;
  residueTotals: {
    GLASS: number;
    METAL: number;
    ORGANIC: number;
    PAPER: number;
    PLASTIC: number;
    TEXTILE: number;
    LANDFILL_WASTE: number;
  };
  token: Token;
}
