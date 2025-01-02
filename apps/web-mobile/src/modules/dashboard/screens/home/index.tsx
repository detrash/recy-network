import { useUserStats } from '@/services/users';
import { DashboardCards } from '../../componentes/cards';
import { DashboardChart } from '../../componentes/chart';
import { useAuth } from '@/hooks/auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardScreen() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: userStats, isFetching: isFetchingUserStats } = useUserStats(user?.id);

  if (isAuthLoading || isFetchingUserStats) {
    return (
      <section className="container flex flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="mt-4 h-[40px] w-full rounded-sm" />
          <Skeleton className="h-[24px] w-full rounded-sm" />
        </div>

        <Skeleton className="h-[150px] w-full rounded-sm" />

        <Skeleton className="h-[500px] w-full rounded-sm" />
      </section>
    );
  }

  return (
    <section className="container flex flex-col gap-6">
      <div className="mt-4 flex flex-col gap-1">
        <h1 className="text-xl font-bold">Welcome back, {user?.name} !</h1>
        <p>Track your environmental impact and contributions here.</p>
      </div>

      <DashboardCards data={userStats} />

      <DashboardChart data={userStats} />
    </section>
  );
}
