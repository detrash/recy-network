import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { apiV1 } from '@/libs/axios';
import parseData from '@/utils/parseData';

import type { UserStatsResponse, ValidateUserBody, ValidateUserResponse } from './types';
import type { ApiError } from '@/entities/response';
import { User } from '@/entities/user';
import { userKey, userStatsKey } from './keys';

export const useUsersValidate = () => {
  const mutation = useMutation<ValidateUserResponse, ApiError, ValidateUserBody>({
    mutationFn: async (payload: ValidateUserBody) => apiV1.post('/users/validate', payload).then(parseData),
    onSuccess: (data) => {
      // TODO: we add user metadata on auth0 to reflected some informations
      // TODO: we need get user ID on database
      console.log(data);
    },
    onError: (error: ApiError) => {
      toast({
        variant: 'destructive',
        title: 'Login Validate Failed',
        description: error.message,
      });
    },
  });

  const validate = (...args: Parameters<typeof mutation.mutateAsync>) => mutation.mutateAsync(...args);

  return { ...mutation, validate };
};

export const useUser = (id: string, options?: UseQueryOptions<User, ApiError>) => {
  return useQuery({
    queryKey: userKey(id),
    queryFn: async () => {
      const response = await apiV1.get<User>(`users/${id}`);
      return parseData(response);
    },
    ...options,
  });
};

export const useUserStats = (id: string, options?: UseQueryOptions<UserStatsResponse, ApiError>) => {
  return useQuery({
    queryKey: userStatsKey(id),
    queryFn: async () => {
      const response = await apiV1.get<UserStatsResponse>(`users/${id}/stats`);
      return parseData(response);
    },
    ...options,
  });
};
