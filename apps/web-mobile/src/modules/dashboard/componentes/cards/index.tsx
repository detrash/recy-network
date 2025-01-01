import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { useCrecy } from '@/hooks/crecy';
import { UserStatsResponse } from '@/services/users/types';
import { Icon } from '@iconify/react';
interface DashboardCardsProps {
  data: UserStatsResponse;
}

export const DashboardCards = ({ data }: DashboardCardsProps) => {
  const { data: cRecyBalanceData, formattedTokenPrice } = useCrecy();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data && (
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total cRECY in wallet</CardTitle>
              <Icon icon="mdi:coin" className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {cRecyBalanceData && cRecyBalanceData.formatted ? cRecyBalanceData.formatted : '-'}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
