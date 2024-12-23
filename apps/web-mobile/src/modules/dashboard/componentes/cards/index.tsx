import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { useCrecy } from '@/hooks/crecy';
import { UserStatsResponse } from '@/services/users/types';
import { Icon } from '@iconify/react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

const lineChartData = [
  { time: '00:00', value: 100 },
  { time: '01:00', value: 102 },
  { time: '02:00', value: 98 },
  { time: '03:00', value: 105 },
  { time: '04:00', value: 110 },
  { time: '05:00', value: 95 },
  { time: '06:00', value: 100 },
  { time: '07:00', value: 105 },
];

interface DashboardCardsProps {
  data: UserStatsResponse;
  isFetching: boolean;
}

export const DashboardCards = ({ data, isFetching }: DashboardCardsProps) => {
  const { data: cRecyBalanceData, error: cRecyBalaceError } = useCrecy();

  if (cRecyBalaceError) {
    toast({
      variant: 'destructive',
      title: cRecyBalaceError.name,
      description: cRecyBalaceError.message,
    });
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {isFetching && (
        <>
          <Skeleton className="h-[150px] w-full rounded-sm" />
          <Skeleton className="h-[150px] w-full rounded-sm" />
          <Skeleton className="h-[150px] w-full rounded-sm" />
          <Skeleton className="h-[150px] w-full rounded-sm" />
        </>
      )}

      {!isFetching && (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Residues Kgs Reported</CardTitle>
              <Icon icon="mdi:scale-balance" className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {data?.totalResidueKg ? String(data?.totalResidueKg) : '-'}
              </div>
              <p
                className={`mt-1 flex w-full justify-between gap-2 text-xs ${
                  data?.monthlyChanges.residueKgs.changeType === 'increase'
                    ? 'text-green-500'
                    : data?.monthlyChanges.residueKgs.changeType === 'decrease'
                      ? 'text-blue-500'
                      : 'text-yellow-500'
                }`}
              >
                {data?.monthlyChanges.residueKgs.changeType === 'increase'
                  ? `↗︎ ${data?.monthlyChanges.residueKgs.percentageChange}% increase`
                  : data?.monthlyChanges.residueKgs.changeType === 'decrease'
                    ? `↘︎ ${data?.monthlyChanges.residueKgs.percentageChange}% decrease`
                    : '→ No change'}
                <span className="text-xs font-extralight text-gray-400">from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports Submitted</CardTitle>
              <Icon icon="mdi:clipboard-text" className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {data?.totalReports ? String(data?.totalReports) : '-'}
              </div>
              <p
                className={`mt-1 flex w-full justify-between gap-2 text-xs ${
                  data?.monthlyChanges.reports.changeType === 'increase'
                    ? 'text-green-500'
                    : data?.monthlyChanges.reports.changeType === 'decrease'
                      ? 'text-blue-500'
                      : 'text-yellow-500'
                }`}
              >
                {data?.monthlyChanges.reports.changeType === 'increase'
                  ? `↗︎ ${data?.monthlyChanges.reports.percentageChange}% increase`
                  : data?.monthlyChanges.reports.changeType === 'decrease'
                    ? `↘︎ ${data?.monthlyChanges.reports.percentageChange}% decrease`
                    : '→ No change'}
                <span className="text-xs font-extralight text-gray-400">from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recy Network - cRECY</CardTitle>
              <Icon icon="mdi:cash" className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <div className="text-primary text-2xl font-bold">$0,879</div>
                <span className="text-xs font-extralight text-gray-400">cRECY / USD</span>
              </div>
              <ResponsiveContainer width={150} height={50}>
                <LineChart data={lineChartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2463EB"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    dot={false}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total cRECY in wallet</CardTitle>
              <Icon icon="mdi:coin" className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {cRecyBalanceData?.formatted ? String(cRecyBalanceData?.formatted) : '-'}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
