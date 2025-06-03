import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { CreateEpisodeData, CreateEpisodeError, CreateEpisodeRequest } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseCreateEpisodeProps = Omit<
  UseMutationOptions<
    AxiosResponse<CreateEpisodeData>,
    CreateEpisodeError,
    { counselorId: string; data: CreateEpisodeRequest },
    unknown
  >,
  'mutationFn'
>;

const useCreateEpisode = ({ onSuccess, onError, ...rest }: UseCreateEpisodeProps = {}) => {
  return useMutation({
    mutationFn: ({ counselorId, data }) => api.V1.createEpisode(counselorId, data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useCreateEpisode };
