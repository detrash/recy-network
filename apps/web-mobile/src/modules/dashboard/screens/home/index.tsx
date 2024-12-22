import { useAuth0 } from '@auth0/auth0-react';
import { Icon } from '@iconify/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ChartContainer } from '@/components/ui/chart';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';

import { Payment, columns } from '@/modules/dashboard/componentes/table/columns';
import { DataTable } from '@/modules/dashboard/componentes/table';
import { useUserStats } from '@/services/users';

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
  Glass: 'hsl(190, 70%, 50%)',
  Textile: 'hsl(340, 70%, 50%)',
  Plastic: 'hsl(50, 70%, 50%)',
  Paper: 'hsl(120, 70%, 50%)',
  Metal: 'hsl(220, 70%, 50%)',
  'Landfill Waste': 'hsl(0, 70%, 50%)',
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

export default function DashboardScreen() {
  const { user } = useAuth0();
  const { data: userStats } = useUserStats('57b5d73d-cdb2-450a-9dc7-11ddf60c8724');

  console.log(userStats);

  const statusData = [
    {
      title: 'Total Residues Kgs Reported',
      value: String(userStats?.totalResidueKg),
      icon: 'mdi:scale-balance',
      status: 'success',
    },
    {
      title: 'Total Forms Submitted',
      value: String(userStats?.totalReports),
      icon: 'mdi:clipboard-text',
      status: 'warning',
    },
    {
      title: 'cRECY Price',
      value: String(userStats?.token.data.price.usd),
      icon: 'mdi:cash',
      status: 'info',
    },
    {
      title: 'Total cRECY in wallet',
      value: String(userStats?.token.wallet.balance.crecy),
      icon: 'mdi:coin',
      status: 'success',
    },
  ];

  return (
    <section className="container mt-4 flex flex-col gap-6">
      <div>
        <h1 className="mb-1 text-xl font-bold">Welcome back, {user?.name} !</h1>
        <p>Track your environmental impact and contributions here.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statusData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <Icon icon={item.icon} className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p
                className={`mt-1 text-xs ${
                  item.status === 'success'
                    ? 'text-green-500'
                    : item.status === 'warning'
                      ? 'text-yellow-500'
                      : 'text-blue-500'
                }`}
              >
                {item.status === 'success'
                  ? '↗︎ 12% increase'
                  : item.status === 'warning'
                    ? '→ No change'
                    : '↘︎ 5% decrease'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <DataTable columns={columns} data={formDataMocked} />

        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Residues reported so far</h2>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="vh-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="total"
                    nameKey="residue"
                    fill="#8884d8"
                    label={({ residue, total }) => `${residue}: ${total.toFixed(2)} kg`}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.residue} fill={chartConfig[entry.residue as keyof ChartConfigType].color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
