import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from './table';
import { columns, ReportTable } from './table/columns';
import { Material, RecyclingReport } from '@/entities/report';

interface DashboardLastReportsProps {
  data: RecyclingReport[];
  isFetching: boolean;
}

export const Reports = ({ data, isFetching }: DashboardLastReportsProps) => {
  const reportsDataFormated: ReportTable[] = data?.map((item) => ({
    id: `${item.id.slice(0, 6)}...${item.id.slice(-6)}`,
    date: new Date(item.reportDate).toLocaleString(),
    audited: item.audited ? 'yes' : 'no',
    evidence: item.residueEvidence,
    total: `${item.materials?.reduce((sum: number, material: Material) => sum + material.weightKg, 0)} Kg`,
  }));

  return (
    <div>
      {isFetching && <Skeleton className="h-[600px] w-full rounded-sm" />}

      {!isFetching && (
        <div className="grid grid-cols-1">
          <DataTable columns={columns} data={reportsDataFormated} />
        </div>
      )}
    </div>
  );
};
