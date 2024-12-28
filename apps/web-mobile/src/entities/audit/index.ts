export interface Audit {
  id: string;
  reportId: string;
  audited?: boolean;
  auditorId?: string | null;
  comments: string | null;
  createdAt: string;
  updatedAt: string;
}
