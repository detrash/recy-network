import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { apiV1 } from '@/libs/axios';
import parseData from '@/utils/parseData';

import type { UserStatsResponse, ValidateUserBody, ValidateUserResponse } from './types';
import type { ApiError } from '@/entities/response';
import { userKey, userStatsKey } from './keys';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '@/entities/user';

export const useUserById = (id: string, options?: UseQueryOptions<User, ApiError>) => {
  return useQuery({
    queryKey: userKey(id),
    queryFn: async () => {
      const response = await apiV1.get<User>(`/users/${id}`);
      return parseData(response);
    },
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    ...options,
  });
};

export const useUsersValidate = () => {
  const { logout } = useAuth0();

  const mutation = useMutation<ValidateUserResponse, ApiError, ValidateUserBody>({
    mutationFn: async (payload: ValidateUserBody) => apiV1.post('/users/validate', payload).then(parseData),
    onSuccess: async (data) => {
      // TODO: we add user metadata on auth0 to reflected some informations
      // TODO: we need get user ID on database
    },

    onError: (error: ApiError) => {
      toast({
        variant: 'destructive',
        title: 'Login Validate Failed',
        description: error.message,
      });

      logout({ logoutParams: { returnTo: window.location.origin } });
    },
  });

  const validate = (...args: Parameters<typeof mutation.mutateAsync>) => mutation.mutateAsync(...args);

  return { ...mutation, validate };
};

export const useUserStats = (id: string, options?: UseQueryOptions<UserStatsResponse, ApiError>) => {
  return useQuery({
    queryKey: userStatsKey(id),
    queryFn: async () => {
      const response = await apiV1.get<UserStatsResponse>(`users/${id}/stats`);
      return parseData(response);
    },
    staleTime: Infinity,
    gcTime: Infinity,
    ...options,
  });
};
