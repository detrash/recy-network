import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Material, UserStatsResponse } from '@/services/users/types';
import { DataTable } from '../table';
import { columns, ReportTable } from '../table/columns';
import { useNavigate } from 'react-router-dom';

interface DashboardLastReportsProps {
  data: UserStatsResponse;
  isFetching: boolean;
}

export const DashboardLastReports = ({ data, isFetching }: DashboardLastReportsProps) => {
  const navigate = useNavigate();
  const reportsDataFormated: ReportTable[] = data?.lastsReports?.map((item) => ({
    id: `${item.id.slice(0, 6)}...${item.id.slice(-6)}`,
    date: new Date(item.reportDate).toLocaleString(),
    audited: item.audited ? 'yes' : 'no',
    evidence: item.residueEvidence,
    total: `${item.materials?.reduce((sum: number, material: Material) => sum + material.weightKg, 0)} Kg`,
  }));

  return (
    <div>
      {isFetching && <Skeleton className="h-[400px] w-full rounded-sm" />}

      {!isFetching && (
        <div className="grid grid-cols-1">
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-lg font-bold">Last Reports</h2>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={reportsDataFormated} />
              <Button variant="secondary" size="sm" className="my-4" onClick={() => navigate('/reports')}>
                View all
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
