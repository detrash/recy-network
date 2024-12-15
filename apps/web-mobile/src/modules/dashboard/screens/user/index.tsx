import { useAuth0 } from '@auth0/auth0-react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/libs/axios';
import { useEffect } from 'react';

const data = [
  {
    name: 'Glass',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Textile',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Metal',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Plastic',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Paper',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Landfill Waste',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export default function DashboardScreen() {
  const { user } = useAuth0();
  const { t } = useTranslation();

  console.log('user dashboard', user);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await api.get('v1/recycling-reports');

        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };

    validateUser();
  }, []);

  return (
    <section className="container flex flex-col gap-8">
      <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
        {t('dashboard:welcome_to_app')} {user?.name}
      </h1>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-md font-medium">Total Residues Kgs Reported</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="flex justify-between">
              <p className="text-primary text-3xl font-bold">150</p>

              <Icon icon="ph:recycle" width="32" height="32" color="hsl(var(--primary))" />
            </div>

            <div>
              <p className="flex gap-1 text-xs">
                <span className="text-bold flex gap-1 text-green-500">
                  <Icon
                    icon="streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow"
                    width="12"
                    height="12"
                  />
                  14,900%
                </span>
                past 30 days.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-md font-medium">Total Residues Kgs Reported</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="flex justify-between">
              <p className="text-3xl font-bold text-green-500">3</p>

              <Icon icon="material-symbols-light:fact-check-outline" width="32" height="32" />
            </div>

            <div>
              <p className="flex gap-1 text-xs">
                <span className="text-bold flex gap-1 text-red-500">
                  <Icon
                    icon="streamline:money-graph-arrow-decrease-down-stats-graph-descend-right-arrow"
                    width="8"
                    height="8"
                  />
                  14,900%
                </span>
                past 30 days.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-md font-medium">cRECY Price</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="flex justify-between">
              <p className="text-3xl font-bold">$0,921 (USD)</p>

              <Icon icon="arcticons:priceconverter" width="32" height="32" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-md font-medium">Total cRECY in wallet</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="flex justify-between">
              <p className="text-3xl font-bold">-</p>

              <Icon icon="game-icons:coins" width="32" height="32" />
            </div>
          </CardContent>
        </Card>
      </section>

      <h2 className="text-xl font-bold leading-relaxed tracking-wide sm:text-2xl">Residues reported so far</h2>

      <section className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-md w-16 font-medium">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full p-1">
                  <Icon icon="ph:recycle" width="32" height="32" color="white" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">Glass</p>
                  <p className="text-3xl font-bold">0 Kgs</p>
                </div>

                <p className="text-xl font-bold">0%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-md w-16 font-medium">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full p-1">
                  <Icon icon="ph:recycle" width="32" height="32" color="white" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">Glass</p>
                  <p className="text-3xl font-bold">0 Kgs</p>
                </div>

                <p className="text-xl font-bold">0%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-md w-16 font-medium">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full p-1">
                  <Icon icon="ph:recycle" width="32" height="32" color="white" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">Glass</p>
                  <p className="text-3xl font-bold">0 Kgs</p>
                </div>

                <p className="text-xl font-bold">0%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-md w-16 font-medium">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full p-1">
                  <Icon icon="ph:recycle" width="32" height="32" color="white" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">Glass</p>
                  <p className="text-3xl font-bold">0 Kgs</p>
                </div>

                <p className="text-xl font-bold">0%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-md w-16 font-medium">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full p-1">
                  <Icon icon="ph:recycle" width="32" height="32" color="white" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">Glass</p>
                  <p className="text-3xl font-bold">0 Kgs</p>
                </div>

                <p className="text-xl font-bold">0%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-md w-16 font-medium">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full p-1">
                  <Icon icon="ph:recycle" width="32" height="32" color="white" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">Glass</p>
                  <p className="text-3xl font-bold">0 Kgs</p>
                </div>

                <p className="text-xl font-bold">0%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-md w-16 font-medium">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full p-1">
                  <Icon icon="ph:recycle" width="32" height="32" color="white" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">Glass</p>
                  <p className="text-3xl font-bold">0 Kgs</p>
                </div>

                <p className="text-xl font-bold">0%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-md w-16 font-medium">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full p-1">
                  <Icon icon="ph:recycle" width="32" height="32" color="white" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">Glass</p>
                  <p className="text-3xl font-bold">0 Kgs</p>
                </div>

                <p className="text-xl font-bold">0%</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </section>

      <section className="pb-4">
        <Card>
          <CardHeader>
            <CardTitle>Forms submitted</CardTitle>
          </CardHeader>
          <CardContent>
            Forms
            {/* TODO: Data Table */}
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
