import { Audit } from '@/entities/audit';

export type CreateAudit = Omit<Audit, 'createdAt' | 'updatedAt' | 'reportId'>;

export type UpdateAudit = Omit<Audit, 'createdAt' | 'updatedAt' | 'reportId'>;
