import { QueryKey } from '@tanstack/react-query';

export const auditsKey = (): QueryKey => ['useAudits'];

export const auditKey = (id: string): QueryKey => ['useAudit', id];
