import { QueryKey } from '@tanstack/react-query';

export const userKey = (id: string): QueryKey => ['useUser', id];

export const userStatsKey = (id: string): QueryKey => ['useUserStats', id];

export const usersKey = (params?: { page?: number; limit?: number }) => ['users', params];
