import { useAuth0 } from '@auth0/auth0-react';
import { Icon } from '@iconify/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { PieChart, Pie, Tooltip, Cell, Line, LineChart, ResponsiveContainer } from 'recharts';
import { ReportTable, columns } from '@/modules/dashboard/componentes/table/columns';
import { DataTable } from '@/modules/dashboard/componentes/table';
import { useUserStats } from '@/services/users';
import { useCrecy } from '@/hooks/crecy';
import { toast } from '@/components/ui/use-toast';
import { Material } from '@/services/users/types';

const colors = {
  GLASS: '#0034D4',
  TEXTILE: '#40AA17',
  ORGANIC: '#000CAC',
  PLASTIC: '#4CA0FF',
  PAPER: '#1E8800',
  METAL: '#68D23F',
  'LANDFILL WASTE': '#0049E9',
};

type ChartConfigType = {
  [key in keyof typeof colors]: {
    label: string;
    color: string;
  };
};

const chartConfig: ChartConfigType = {
  GLASS: {
    label: 'Glass',
    color: colors.GLASS,
  },
  ORGANIC: {
    label: 'Organic',
    color: colors.ORGANIC,
  },
  TEXTILE: {
    label: 'Textile',
    color: colors.TEXTILE,
  },
  PLASTIC: {
    label: 'Plastic',
    color: colors.PLASTIC,
  },
  PAPER: {
    label: 'Paper',
    color: colors.PAPER,
  },
  METAL: {
    label: 'Metal',
    color: colors.METAL,
  },
  'LANDFILL WASTE': {
    label: 'Landfill Waste',
    color: colors['LANDFILL WASTE'],
  },
};

const data = [
  { time: '00:00', value: 100 },
  { time: '01:00', value: 102 },
  { time: '02:00', value: 98 },
  { time: '03:00', value: 105 },
  { time: '04:00', value: 110 },
  { time: '05:00', value: 95 },
  { time: '06:00', value: 100 },
  { time: '07:00', value: 105 },
];

export default function DashboardScreen() {
  const { user } = useAuth0();
  const { data: userStats, isFetching: isFetchingUserStats } = useUserStats('0779f19c-34a8-40c2-a482-54a353a507c0');
  const { data: cRecyBalanceData, error: cRecyBalaceError } = useCrecy();

  const pieChartData =
    userStats?.residueMaterialWeights &&
    Object.entries(userStats.residueMaterialWeights)
      .map((item) => ({
        residue: item[0],
        total: item[1],
      }))
      .filter((item) => item.total > 0);

  const reportsDataFormated: ReportTable[] = userStats?.lastsReports?.map((item) => ({
    id: `${item.id.slice(0, 6)}...${item.id.slice(-6)}`,
    date: new Date(item.reportDate).toLocaleString(),
    audited: item.audited ? 'yes' : 'no',
    evidence: item.residueEvidence,
    total: `${item.materials?.reduce((sum: number, material: Material) => sum + material.weightKg, 0)} Kg`,
  }));

  if (cRecyBalaceError) {
    toast({
      variant: 'destructive',
      title: cRecyBalaceError.name,
      description: cRecyBalaceError.message,
    });
  }

  return (
    <section className="container mt-4 flex flex-col gap-6">
      <div>
        <h1 className="mb-1 text-xl font-bold">Welcome back, {user?.name} !</h1>
        <p>Track your environmental impact and contributions here.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isFetchingUserStats && (
          <>
            <Skeleton className="h-[150px] w-full rounded-sm" />
            <Skeleton className="h-[150px] w-full rounded-sm" />
            <Skeleton className="h-[150px] w-full rounded-sm" />
            <Skeleton className="h-[150px] w-full rounded-sm" />
          </>
        )}

        {!isFetchingUserStats && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Residues Kgs Reported</CardTitle>
                <Icon icon="mdi:scale-balance" className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-primary text-2xl font-bold">
                  {userStats?.totalResidueKg ? String(userStats?.totalResidueKg) : '-'}
                </div>
                <p
                  className={`mt-1 flex w-full justify-between gap-2 text-xs ${
                    userStats?.monthlyChanges.residueKgs.changeType === 'increase'
                      ? 'text-green-500'
                      : userStats?.monthlyChanges.residueKgs.changeType === 'decrease'
                        ? 'text-blue-500'
                        : 'text-yellow-500'
                  }`}
                >
                  {userStats?.monthlyChanges.residueKgs.changeType === 'increase'
                    ? `↗︎ ${userStats?.monthlyChanges.residueKgs.percentageChange}% increase`
                    : userStats?.monthlyChanges.residueKgs.changeType === 'decrease'
                      ? `↘︎ ${userStats?.monthlyChanges.residueKgs.percentageChange}% decrease`
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
                  {userStats?.totalReports ? String(userStats?.totalReports) : '-'}
                </div>
                <p
                  className={`mt-1 flex w-full justify-between gap-2 text-xs ${
                    userStats?.monthlyChanges.reports.changeType === 'increase'
                      ? 'text-green-500'
                      : userStats?.monthlyChanges.reports.changeType === 'decrease'
                        ? 'text-blue-500'
                        : 'text-yellow-500'
                  }`}
                >
                  {userStats?.monthlyChanges.reports.changeType === 'increase'
                    ? `↗︎ ${userStats?.monthlyChanges.reports.percentageChange}% increase`
                    : userStats?.monthlyChanges.reports.changeType === 'decrease'
                      ? `↘︎ ${userStats?.monthlyChanges.reports.percentageChange}% decrease`
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
                  <LineChart data={data}>
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

      <div className="grid min-h-[400px] gap-4 lg:grid-cols-1 xl:grid-cols-2">
        {isFetchingUserStats && <Skeleton className="h-full w-full rounded-sm" />}

        {!isFetchingUserStats && (
          <div className="grid grid-cols-1">
            <DataTable columns={columns} data={reportsDataFormated} />
          </div>
        )}

        {isFetchingUserStats && <Skeleton className="h-full w-full rounded-sm" />}

        {!isFetchingUserStats && (
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-lg font-bold">Residues reported so far</h2>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="vh-80">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="total"
                    nameKey="residue"
                    fill="#020817"
                    label={({ residue, total }) => `${residue}: ${total.toFixed(2)} kg`}
                  >
                    {pieChartData?.map((entry) => (
                      <Cell key={entry.residue} fill={chartConfig[entry.residue as keyof ChartConfigType]?.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
