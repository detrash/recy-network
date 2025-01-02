import { UserStatsResponse } from '@/services/users/types';
import { materialColors } from './constants';

export type ChartConfigType = {
  [key in keyof typeof materialColors]: {
    label: string;
    color: string;
  };
};

export interface DashboardChartProps {
  data: UserStatsResponse;
}
