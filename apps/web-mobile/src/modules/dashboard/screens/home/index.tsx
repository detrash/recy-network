import { useAuth0 } from '@auth0/auth0-react';
import { Icon } from '@iconify/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { PieChart, Pie, Tooltip, Cell, Line, LineChart, ResponsiveContainer } from 'recharts';
import { Payment, columns } from '@/modules/dashboard/componentes/table/columns';
import { DataTable } from '@/modules/dashboard/componentes/table';
import { useUserStats } from '@/services/users';
import { useCrecy } from '@/hooks/crecy';
import { toast } from '@/components/ui/use-toast';

const formDataMocked: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed72f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728e652f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed56f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
];

type ChartData = {
  residue: string;
  total: number;
};

const chartData: ChartData[] = [
  { residue: 'Glass', total: 25.0 },
  { residue: 'Textile', total: 35.8 },
  { residue: 'Plastic', total: 42.5 },
  { residue: 'Paper', total: 18.75 },
  { residue: 'Metal', total: 12.3 },
  { residue: 'Landfill Waste', total: 28.95 },
];

const colors = {
  Glass: '#0036D6',
  Textile: '#026C00',
  Organic: '#3286FF',
  Plastic: '#0036D6',
  Paper: '#026C00',
  Metal: '#52BC29',
  'Landfill Waste': '#3286FF',
};

type ChartConfigType = {
  [key in keyof typeof colors]: {
    label: string;
    color: string;
  };
};

const chartConfig: ChartConfigType = {
  Glass: {
    label: 'Glass',
    color: colors.Glass,
  },
  Organic: {
    label: 'Organic',
    color: colors.Organic,
  },
  Textile: {
    label: 'Textile',
    color: colors.Textile,
  },
  Plastic: {
    label: 'Plastic',
    color: colors.Plastic,
  },
  Paper: {
    label: 'Paper',
    color: colors.Paper,
  },
  Metal: {
    label: 'Metal',
    color: colors.Metal,
  },
  'Landfill Waste': {
    label: 'Landfill Waste',
    color: colors['Landfill Waste'],
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
  // Adicione mais dados conforme necessário
];

export default function DashboardScreen() {
  const { user } = useAuth0();
  const { data: userStats, isFetching: isFetchingUserStats } = useUserStats('0779f19c-34a8-40c2-a482-54a353a507c0');
  const { data: cRecyBalanceData, error: cRecyBalaceError } = useCrecy();

  if (cRecyBalaceError) {
    toast({
      variant: 'destructive',
      title: cRecyBalaceError.name,
      description: cRecyBalaceError.message,
    });
  }

  console.log(cRecyBalanceData);

  return (
    <section className="container mt-4 flex flex-col gap-6">
      <div>
        <h1 className="mb-1 text-xl font-bold">Welcome back, {user?.name} !</h1>
        <p>Track your environmental impact and contributions here.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isFetchingUserStats && (
          <>
            <Skeleton className="h-[150px] w-[350px] rounded-sm" />
            <Skeleton className="h-[150px] w-[350px] rounded-sm" />
            <Skeleton className="h-[150px] w-[350px] rounded-sm" />
            <Skeleton className="h-[150px] w-[350px] rounded-sm" />
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
                  <div className="text-primary text-2xl font-bold">$928</div>
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
                <div className="text-primary text-2xl font-bold">{String(cRecyBalanceData.formatted)}</div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {isFetchingUserStats && <Skeleton className="h-full w-full rounded-sm" />}
        {!isFetchingUserStats && <DataTable columns={columns} data={formDataMocked} />}

        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Residues reported so far</h2>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="vh-80">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="total"
                  nameKey="residue"
                  fill="#020817"
                  label={({ residue, total }) => `${residue}: ${total.toFixed(2)} kg`}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.residue} fill={chartConfig[entry.residue as keyof ChartConfigType].color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
