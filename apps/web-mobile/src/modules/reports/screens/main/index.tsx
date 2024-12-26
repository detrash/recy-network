import { useUserById } from '@/services/users';
import { Reports } from '../../components/list';
import { Card } from '@/components/ui/card';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReportsScreen() {
  const { data: userData, isFetching: isFetchinguseUser } = useUserById('0779f19c-34a8-40c2-a482-54a353a507c0');
  const navigate = useNavigate();

  return (
    <main className="container flex flex-col gap-4">
      <Card className="mt-4 flex flex-col items-center gap-4 p-4 sm:flex-row sm:justify-between">
        {isFetchinguseUser && <Skeleton className="h-[100px] w-full rounded-sm" />}

        {!isFetchinguseUser && (
          <>
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <Icon icon="mdi:form" className="text-muted-foreground h-16 w-16 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-bold uppercase sm:text-xl">
                  You have {userData?.recyclingReports?.length || 0} reports
                </h2>
                <p className="text-sm text-gray-600">Submit and track your recycling efforts with ease.</p>
              </div>
            </div>

            <Button
              className="btn btn-primary no-animation w-full text-white sm:w-auto sm:self-center"
              onClick={() => navigate('/reports/submit')}
            >
              Create Report
            </Button>
          </>
        )}
      </Card>

      <Reports data={userData?.recyclingReports} isFetching={isFetchinguseUser} />
    </main>
  );
}
