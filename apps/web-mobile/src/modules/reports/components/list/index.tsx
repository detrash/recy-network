import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from './table';
import { columns, ReportTable } from './table/columns';
import { RecyclingReport } from '@/entities/report';

interface DashboardReportsProps {
  data: RecyclingReport[];
  isFetching: boolean;
}

export const ReportsList = ({ data, isFetching }: DashboardReportsProps) => {
  const reportsDataFormated: ReportTable[] = data?.map((item) => ({
    id: item.id,
    date: new Date(item.reportDate).toLocaleString(),
    status: item.audits[0].status,
    evidence: item.residueEvidence,
    quantity: `${Object.values(item.materials).reduce((sum, quantity) => sum + (quantity ?? 0), 0)} Kg`,
  }));

  return (
    <div>
      {isFetching && <Skeleton className="h-[600px] w-full rounded-sm" />}

      {!isFetching && (
        <div className="grid grid-cols-1">
          {!reportsDataFormated && 'There is no data to display'}
          {reportsDataFormated && <DataTable columns={columns} data={reportsDataFormated} />}
        </div>
      )}
    </div>
  );
};
