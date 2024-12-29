import { AuditStatusConstants } from '@/constants/index';
import { Audit } from '../audit';
import { User } from '../user';

export interface Metadata {
  attributes?: { trait_type: string; value: string | undefined }[];
  description?: string;
  name?: string;
  image?: string | Buffer;
  [key: string]: unknown;
}

export const MATERIAL_TYPES = {
  PLASTIC: 'PLASTIC',
  PAPER: 'PAPER',
  METAL: 'METAL',
  GLASS: 'GLASS',
  ORGANIC: 'ORGANIC',
  TEXTILE: 'TEXTILE',
  LANDFILL_WASTE: 'LANDFILL_WASTE',
} as const;

export type MaterialType = keyof typeof MATERIAL_TYPES;

export interface Material {
  [MATERIAL_TYPES.METAL]?: number;
  [MATERIAL_TYPES.PLASTIC]?: number;
  [MATERIAL_TYPES.PAPER]?: number;
  [MATERIAL_TYPES.GLASS]?: number;
  [MATERIAL_TYPES.TEXTILE]?: number;
  [MATERIAL_TYPES.LANDFILL_WASTE]?: number;
  // Add more residue types as needed
}

export type Materials = Material[];

export interface RecyclingReport {
  id: string;
  reportDate: string;
  materials: Material;
  status: keyof typeof AuditStatusConstants;
  residueEvidence: string;
  metadata: Metadata;
  submittedBy: string;
  phone?: string;
  walletAddress?: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  audits: Audit[];
}
