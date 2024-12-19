import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { apiV1 } from '@/libs/axios';
import parseData from '@/utils/parseData';

import type { ValidateUserBody, ValidateUserResponse } from './types';
import type { ApiError } from '@/entities/response';

export const useUsersValidate = () => {
  const navigate = useNavigate();

  const mutation = useMutation<ValidateUserResponse, ApiError, ValidateUserBody>({
    mutationFn: async (payload: ValidateUserBody) => apiV1.post('/users/validate', payload).then(parseData),
    onSuccess: () => {
      navigate('/dashboard');
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
