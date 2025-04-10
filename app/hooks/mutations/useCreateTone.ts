import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { CreateToneData, CreateToneError, CreateToneRequestDto } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseCreateToneProps = Omit<
  UseMutationOptions<AxiosResponse<CreateToneData>, CreateToneError, CreateToneRequestDto, unknown>,
  'mutationFn'
>;

const useCreateTone = ({ onSuccess, onError, ...rest }: UseCreateToneProps = {}) => {
  return useMutation({
    mutationFn: (data: CreateToneRequestDto) => api.V1.createTone(data),
    onSuccess: (...props) => {
      onSuccess?.(...props);
    },
    onError: (...props) => {
      onError?.(...props);
    },
    ...rest,
  });
};

export { useCreateTone };
