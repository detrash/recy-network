import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from './table';
import { columns, AuditsTable } from './table/columns';
import { Audit } from '@/entities/audit';
import { useState } from 'react';
import { AuditModal } from '../audit-modal';
import { useRecyclingReportById } from '@/services/reports';
import { useUpdateAudit } from '../../services/audits';
import { UpdateAudit } from '../../services/audits/types';
import { AuditStatusConstants } from '@/constants/index';

interface DashboardAuditsProps {
  data: Audit[];
  isFetching: boolean;
}

export const AuditsList = ({ data, isFetching }: DashboardAuditsProps) => {
  const { mutate: updateAudit } = useUpdateAudit();
  const auditsDataFormatted: AuditsTable[] = data?.map((item) => ({
    id: item.id,
    date: new Date(item.createdAt).toLocaleString(),
    status: item.status,
    comments: item.comments ? item.comments : 'No comment',
  }));

  const [selectedSubmittedReportId, setSelectedSubmittedReportId] = useState<string | null>(null);
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);

  const { data: selectedReport, isFetching: isFetchingSelectedReport } =
    useRecyclingReportById(selectedSubmittedReportId);

  const handleReportAction = (audit: AuditsTable) => {
    const findedAudit = data.find((item) => item.id === audit.id);

    setSelectedAudit(findedAudit);
    setSelectedSubmittedReportId(findedAudit.reportId);
  };

  const handleAudit = (comments: string, auditedStatus: keyof typeof AuditStatusConstants) => {
    if (!selectedAudit) return;

    const updatedAudit: UpdateAudit = {
      id: selectedAudit.id,
      comments: comments,
      auditorId: '0779f19c-34a8-40c2-a482-54a353a507c0', // TODO: get current user
      status: auditedStatus,
    };

    updateAudit(updatedAudit);
    setSelectedSubmittedReportId(null);
  };

  return (
    <div>
      {isFetching && <Skeleton className="h-[600px] w-full rounded-sm" />}

      {!isFetching && (
        <div className="grid grid-cols-1">
          {!auditsDataFormatted && 'There is no data to display'}
          {auditsDataFormatted && (
            <DataTable
              columns={columns}
              data={auditsDataFormatted}
              onClickRow={(audit: AuditsTable) => handleReportAction(audit)}
            />
          )}
        </div>
      )}

      <div className="flex w-full space-x-4">
        {selectedSubmittedReportId && (
          <AuditModal
            isOpen={!!selectedSubmittedReportId}
            isLoading={isFetchingSelectedReport}
            report={selectedReport}
            onClose={() => setSelectedSubmittedReportId(null)}
            onApprove={(comments) => handleAudit(comments, AuditStatusConstants.APPROVED)}
            onReject={(comments) => handleAudit(comments, AuditStatusConstants.REJECTED)}
          />
        )}
      </div>
    </div>
  );
};
