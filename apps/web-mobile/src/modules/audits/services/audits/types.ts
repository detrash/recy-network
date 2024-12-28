export interface CreateAudit {
  id: string;
  audited: boolean;
  auditorId: string | null;
  comments: string | null;
}

export interface UpdateAudit {
  id: string;
  audited: boolean;
  auditorId: string | null;
  comments: string | null;
}
