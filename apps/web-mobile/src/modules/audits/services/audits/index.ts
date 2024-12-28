import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { apiV1 } from '@/libs/axios';
import parseData from '@/utils/parseData';
import { toast } from '@/components/ui/use-toast';

import type { ApiError } from '@/entities/response';
import { CreateAudit, UpdateAudit } from './types';
import { Audit } from '@/entities/audit';

export const useAudits = (options?: UseQueryOptions<Audit[], ApiError>) => {
  return useQuery({
    queryKey: ['audits'],
    queryFn: async () => {
      const response = await apiV1.get<Audit[]>('/audits?page=1&limit=10');
      return parseData(response);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    ...options,
  });
};

export const useAuditById = (id: string, options?: UseQueryOptions<Audit, ApiError>) => {
  return useQuery({
    queryKey: ['audit', id],
    queryFn: async () => {
      const response = await apiV1.get<Audit>(`/audits/${id}`);
      return parseData(response);
    },
    enabled: !!id,
    ...options,
  });
};

export const useCreateAudit = () => {
  const queryClient = useQueryClient();

  return useMutation<Audit, ApiError, CreateAudit>({
    mutationFn: async (auditData: CreateAudit) => {
      const response = await apiV1.post('/audits', auditData);
      return parseData(response);
    },
    onSuccess: () => {
      toast({ variant: 'default', title: 'Success', description: 'Audit created successfully.' });
      queryClient.invalidateQueries({ queryKey: ['audits'] });
    },
    onError: (error: ApiError) => {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    },
  });
};

export const useUpdateAudit = () => {
  const queryClient = useQueryClient();

  return useMutation<Audit, ApiError, UpdateAudit>({
    mutationFn: async ({ id, ...payload }: UpdateAudit) => {
      const response = await apiV1.put(`/audits/${id}`, payload);
      return parseData(response);
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Audit updated successfully.' });
      queryClient.invalidateQueries({ queryKey: ['audits'] });
    },
    onError: (error: ApiError) => {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    },
  });
};

export const useDeleteAudit = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (id: string) => {
      const response = await apiV1.delete(`/audits/${id}`);
      return parseData(response);
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Audit deleted successfully.' });
      queryClient.invalidateQueries({ queryKey: ['audits'] });
    },
    onError: (error: ApiError) => {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    },
  });
};
