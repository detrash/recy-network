import { AuditStatusConstants } from '@/constants/index';

export interface Audit {
  id: string;
  reportId: string;
  auditorId?: string | null;
  comments: string | null;
  createdAt: string;
  updatedAt: string;
  status: keyof typeof AuditStatusConstants;
}
