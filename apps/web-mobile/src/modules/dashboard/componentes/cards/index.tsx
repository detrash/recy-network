import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { useCrecy } from '@/hooks/crecy';
import { useGetTokenPrice } from '@/services/crecy';
import { UserStatsResponse } from '@/services/users/types';
import { Icon } from '@iconify/react';
interface DashboardCardsProps {
  data: UserStatsResponse;
  isFetching: boolean;
}

const tokenAddress = '0x34c11a932853ae24e845ad4b633e3cef91afe583';

export const DashboardCards = ({ data, isFetching }: DashboardCardsProps) => {
  const { data: cRecyBalanceData, error: cRecyBalaceError } = useCrecy();
  const { data: tokenPriceData, error: errorFetchingTokenPrice } = useGetTokenPrice();

  const tokenPrice = tokenPriceData?.attributes?.token_prices[tokenAddress];
  const formattedTokenPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(tokenPrice));

  if (cRecyBalaceError) {
    toast({
      variant: 'destructive',
      title: cRecyBalaceError.name,
      description: cRecyBalaceError.message,
    });
  }

  if (errorFetchingTokenPrice) {
    toast({
      variant: 'destructive',
      title: errorFetchingTokenPrice.name,
      description: errorFetchingTokenPrice.message,
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
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Residues Kgs Reported</CardTitle>
              <Icon icon="mdi:scale-balance" className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
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
                <span className="text-xs text-gray-400 font-extralight">from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Reports Submitted</CardTitle>
              <Icon icon="mdi:clipboard-text" className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
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
                <span className="text-xs text-gray-400 font-extralight">from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">cRECY</CardTitle>
              <Icon icon="mdi:cash" className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">{formattedTokenPrice}</div>
                <span className="text-xs text-gray-400 font-extralight">cRECY / USD</span>
              </div>
              {/* TODO: We will contine work here when our backend return more information about or toke price */}
              {/* <ResponsiveContainer width={150} height={50}>
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
              </ResponsiveContainer> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total cRECY in wallet</CardTitle>
              <Icon icon="mdi:coin" className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {typeof cRecyBalanceData?.formatted === 'number' && !isNaN(cRecyBalanceData.formatted)
                  ? String(cRecyBalanceData.formatted)
                  : '-'}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
