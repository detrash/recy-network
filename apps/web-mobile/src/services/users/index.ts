import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { apiV1 } from '@/libs/axios';
import parseData from '@/utils/parseData';
import type { CreateUserBody, UpdateUserBody } from './types';
import type { UserStatsResponse, ValidateUserBody, ValidateUserResponse } from './types';
import type { ApiError } from '@/entities/response';
import { userKey, userStatsKey, usersKey } from './keys';
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

export const useUsers = (params?: { page?: number; limit?: number }, options?: UseQueryOptions<User[], ApiError>) => {
  return useQuery({
    queryKey: usersKey(params),
    queryFn: async () => {
      const response = await apiV1.get<User[]>('/users', { params });
      return parseData(response);
    },
    staleTime: Infinity,
    gcTime: Infinity,
    ...options,
  });
};

export const useCreateUser = () => {
  const mutation = useMutation<User, ApiError, CreateUserBody>({
    mutationFn: async (payload: CreateUserBody) => apiV1.post<User>('/users', payload).then(parseData),

    onSuccess: (data) => {
      toast({
        title: 'User Created',
        description: `User ${data.id} has been successfully created.`,
      });
    },

    onError: (error: ApiError) => {
      toast({
        variant: 'destructive',
        title: 'User Creation Failed',
        description: error.message,
      });
    },
  });

  const createUser = (...args: Parameters<typeof mutation.mutateAsync>) => mutation.mutateAsync(...args);

  return { ...mutation, createUser };
};

export const useUpdateUser = () => {
  const mutation = useMutation<User, ApiError, { id: string; data: UpdateUserBody }>({
    mutationFn: async ({ id, data }) => apiV1.put<User>(`/users/${id}`, data).then(parseData),

    onSuccess: (data) => {
      toast({
        title: 'User Updated',
        description: `User ${data.name} has been successfully updated.`,
      });
    },

    onError: (error: ApiError) => {
      toast({
        variant: 'destructive',
        title: 'User Update Failed',
        description: error.message,
      });
    },
  });

  const updateUser = (...args: Parameters<typeof mutation.mutateAsync>) => mutation.mutateAsync(...args);

  return { ...mutation, updateUser };
};

export const useDeleteUser = () => {
  const mutation = useMutation<User, ApiError, string>({
    mutationFn: async (id) => apiV1.delete<User>(`/users/${id}`).then(parseData),

    onSuccess: (data) => {
      toast({
        title: 'User Deleted',
        description: `User ${data.id} has been successfully deleted.`,
      });
    },

    onError: (error: ApiError) => {
      toast({
        variant: 'destructive',
        title: 'User Deletion Failed',
        description: error.message,
      });
    },
  });

  const deleteUser = (...args: Parameters<typeof mutation.mutateAsync>) => mutation.mutateAsync(...args);

  return { ...mutation, deleteUser };
};
