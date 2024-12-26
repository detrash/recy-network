import { UserStatsResponse } from '@/services/users/types';
import { colors } from './constants';

export type ChartConfigType = {
  [key in keyof typeof colors]: {
    label: string;
    color: string;
  };
};

export interface DashboardChartProps {
  data: UserStatsResponse;
  isFetching: boolean;
}
