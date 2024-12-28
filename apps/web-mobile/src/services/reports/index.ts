import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { apiV1 } from '@/libs/axios';
import parseData from '@/utils/parseData';
import { toast } from '@/components/ui/use-toast';

import type { ApiError } from '@/entities/response';
import { recyclingReportsKey, recyclingReportKey, recyclingReportByUserKey } from './keys';
import { UpdateRecyclingReport } from './types';
import { RecyclingReport } from '@/entities/report';

export const useRecyclingReports = (options?: UseQueryOptions<RecyclingReport[], ApiError>) => {
  return useQuery({
    queryKey: recyclingReportsKey(),
    queryFn: async () => {
      const response = await apiV1.get<RecyclingReport[]>('/recycling-reports');
      return parseData(response);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    ...options,
  });
};

export const useRecyclingReportsByUser = (userId: string, options?: UseQueryOptions<RecyclingReport[], ApiError>) => {
  return useQuery({
    queryKey: recyclingReportByUserKey(userId),
    queryFn: async () => {
      const response = await apiV1.get<RecyclingReport[]>(`/recycling-reports/user/${userId}`);
      return parseData(response);
    },
    enabled: !!userId,
    ...options,
  });
};

export const useRecyclingReportById = (id?: string, options?: UseQueryOptions<RecyclingReport, ApiError>) => {
  return useQuery({
    queryKey: recyclingReportKey(id),
    queryFn: async () => {
      const response = await apiV1.get<RecyclingReport>(`/recycling-reports/${id}`);
      return parseData(response);
    },
    enabled: !!id,
    ...options,
  });
};

export const useCreateRecyclingReport = () => {
  const queryClient = useQueryClient();

  return useMutation<RecyclingReport, ApiError, FormData>({
    mutationFn: async (formData: FormData) => {
      const response = await apiV1.post('/recycling-reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast({ variant: 'default', title: 'Success', description: 'Recycling report created successfully.' });
      queryClient.invalidateQueries({
        queryKey: [recyclingReportsKey()],
      });
    },
    onError: (error: ApiError) => {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    },
  });
};

export const useUpdateRecyclingReport = () => {
  const queryClient = useQueryClient();

  return useMutation<RecyclingReport, ApiError, UpdateRecyclingReport>({
    mutationFn: async ({ id, ...payload }: UpdateRecyclingReport) =>
      apiV1.put(`/recycling-reports/${id}`, payload).then(parseData),
    onSuccess: () => {
      toast({ title: 'Success', description: 'Recycling report updated successfully.' });
      queryClient.invalidateQueries({
        queryKey: recyclingReportsKey(),
      });
    },
    onError: (error: ApiError) => {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    },
  });
};

export const useDeleteRecyclingReport = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (id: string) => apiV1.delete(`/recycling-reports/${id}`).then(parseData),
    onSuccess: () => {
      toast({ title: 'Success', description: 'Recycling report deleted successfully.' });
      queryClient.invalidateQueries({
        queryKey: recyclingReportsKey(),
      });
    },
    onError: (error: ApiError) => {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    },
  });
};
