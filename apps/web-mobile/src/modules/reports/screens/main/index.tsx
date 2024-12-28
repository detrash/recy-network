import { ReportsList } from '../../components/list';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecyclingReportsByUser } from '../../../../services/reports';
import { ReportsModal } from '../../components/reports-modal';
import { useState } from 'react';

export default function ReportsScreen() {
  const { data: reportsData, isFetching: isFetchingReports } = useRecyclingReportsByUser(
    '0779f19c-34a8-40c2-a482-54a353a507c0'
  );

  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);

  return (
    <main className="container flex flex-col gap-4">
      <Card className="flex flex-col items-center gap-4 p-4 mt-4 sm:flex-row sm:justify-between">
        {isFetchingReports && <Skeleton className="h-[100px] w-full rounded-sm" />}

        {!isFetchingReports && (
          <>
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div>
                <h2 className="text-lg font-bold uppercase sm:text-xl">You have {reportsData?.length || 0} reports</h2>
                <p className="text-sm text-gray-600">Submit and track your recycling efforts with ease.</p>
              </div>
            </div>

            <Button
              className="w-full text-white btn btn-primary no-animation sm:w-auto sm:self-center"
              onClick={() => setIsReportsModalOpen(true)}
            >
              Create Report
            </Button>
          </>
        )}
      </Card>

      {isReportsModalOpen && <ReportsModal isOpen={isReportsModalOpen} onClose={() => setIsReportsModalOpen(false)} />}
      <ReportsList data={reportsData} isFetching={isFetchingReports} />
    </main>
  );
}
