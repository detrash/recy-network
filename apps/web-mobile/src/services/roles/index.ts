import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiV1 } from '@/libs/axios';
import { rolesKey } from './keys';
import { RolesResponse } from './types';

export const useRoles = (options?: UseQueryOptions<RolesResponse, Error>) => {
  return useQuery({
    queryKey: rolesKey(),
    queryFn: async () => {
      const response = await apiV1.get<RolesResponse>('/roles');
      return response.data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    ...options,
  });
};
