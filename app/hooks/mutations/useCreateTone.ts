import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { CreateToneData, CreateToneError, CreateToneRequest } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseCreateToneProps = Omit<
  UseMutationOptions<AxiosResponse<CreateToneData>, CreateToneError, CreateToneRequest, unknown>,
  'mutationFn'
>;

const useCreateTone = ({ onSuccess, onError, ...rest }: UseCreateToneProps = {}) => {
  return useMutation({
    mutationFn: (data: CreateToneRequest) => api.V1.createTone(data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useCreateTone };
