import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

import { Pie, Cell, Tooltip, Legend, PieChart } from 'recharts';
import { chartConfig } from './constants';
import { DashboardChartProps, ChartConfigType } from './types';

export const DashboardChart = ({ data }: DashboardChartProps) => {
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
              <ChartContainer config={chartConfig} className="vh-80">
                <PieChart>
                  <Pie
                    data={Object.entries(data.materials).map(([residue, total]) => ({
                      residue,
                      total,
                    }))}
                    dataKey="total"
                    nameKey="residue"
                    fill="#020817"
                    label={({ residue, total }) => `${residue}: ${total.toFixed(2)} kg`}
                  >
                    {Object.entries(data.materials).map(([residue]) => (
                      <Cell key={residue} fill={chartConfig[residue as keyof ChartConfigType]?.color} />
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
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
