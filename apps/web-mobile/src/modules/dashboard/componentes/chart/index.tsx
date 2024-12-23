import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { Pie, Cell, Tooltip, Legend, PieChart } from 'recharts';
import { chartConfig } from './constants';
import { DashboardChartProps, ChartConfigType } from './types';

export const DashboardChart = ({ data, isFetching }: DashboardChartProps) => {
  const pieChartData =
    data?.residueMaterialWeights &&
    Object.entries(data.residueMaterialWeights)
      .map((item) => ({
        residue: item[0],
        total: item[1],
      }))
      .filter((item) => item.total > 0);

  return (
    <div>
      {isFetching && <Skeleton className="h-[500px] w-full rounded-sm" />}

      {!isFetching && (
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
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
