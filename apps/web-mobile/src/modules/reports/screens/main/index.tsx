import { ReportsList } from '../../components/list';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecyclingReportsByUser } from '../../../../services/reports';
import { ReportsModal } from '../../components/reports-modal';
import { useState } from 'react';
import { useAuth } from '@/hooks/auth';

export default function ReportsScreen() {
  const { user } = useAuth();
  const { data: reportsData, isFetching: isFetchingReports } = useRecyclingReportsByUser(user?.id);

  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);

  if (isFetchingReports) {
    return (
      <main className="container my-4 flex flex-col gap-4">
        <Skeleton className="h-[100px] w-full rounded-sm" />

        <Skeleton className="h-[600px] w-full rounded-sm" />
      </main>
    );
  }

  return (
    <main className="container my-4 flex flex-col gap-4">
      <Card className="flex flex-col items-center gap-4 p-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-lg font-bold uppercase sm:text-xl">You have {reportsData?.length || 0} reports</h2>
            <p className="text-sm text-gray-600">Submit and track your recycling efforts with ease.</p>
          </div>
        </div>

        <Button
          className="btn btn-primary no-animation w-full text-white sm:w-auto sm:self-center"
          onClick={() => setIsReportsModalOpen(true)}
        >
          Create Report
        </Button>
      </Card>

      <ReportsModal isOpen={isReportsModalOpen} onClose={() => setIsReportsModalOpen(false)} />
      <ReportsList data={reportsData} />
    </main>
  );
}
