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
  weightKg: number;
  materialType: MaterialType;
}

export interface RecyclingReport {
  id: string;
  reportDate: string;
  materials: Material[];
  audited: boolean;
  residueEvidence: string;
  metadata: Record<string, unknown>;
}
