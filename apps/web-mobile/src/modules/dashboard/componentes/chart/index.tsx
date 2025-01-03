import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

import { Pie, Cell, Legend, PieChart, LabelProps, ResponsiveContainer } from 'recharts';
import { chartConfig } from './constants';
import { DashboardChartProps, ChartConfigType } from './types';

const RADIAN = Math.PI / 180;
interface CustomizedLabelProps extends LabelProps {
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      className="text-xs sm:text-sm lg:text-lg"
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const DashboardChart = ({ data }: DashboardChartProps) => {
  const chartData =
    data?.materials &&
    Object.entries(data.materials).map(([residue, total]) => ({
      residue,
      total,
    }));

  return (
    <div>
      {data && (
        <Card className="h-full">
          <CardHeader>
            <h2 className="text-lg font-bold">Residues reported so far</h2>
          </CardHeader>
          <CardContent>
            {data?.materials && Object.keys(data.materials).length === 0 ? 'There is no data to display' : null}

            {data?.materials && Object.keys(data.materials).length > 0 && (
              <ResponsiveContainer width="100%" height={450}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="total"
                    nameKey="residue"
                    fill="#020817"
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {Object.entries(data.materials).map(([residue]) => (
                      <Cell key={residue} fill={chartConfig[residue as keyof ChartConfigType]?.color} />
                    ))}
                  </Pie>
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    formatter={(value) => <span className="text-xs font-medium sm:text-sm lg:text-lg">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
