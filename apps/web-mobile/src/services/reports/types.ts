import { Material } from '@/entities/report';

export interface CreateRecyclingReport {
  submittedBy: string;
  phone?: string;
  materials: Material[];
  walletAddress?: string;
  residueEvidence?: string;
  residueEvidenceFile?: File;
}

export interface UpdateRecyclingReport extends CreateRecyclingReport {
  id: string;
}
