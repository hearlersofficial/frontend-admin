import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { UpdateEpisodeData, UpdateEpisodeError, UpdateEpisodeRequest } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseUpdateEpisodeProps = Omit<
  UseMutationOptions<
    AxiosResponse<UpdateEpisodeData>,
    UpdateEpisodeError,
    { episodeId: string; counselorId: string; data: UpdateEpisodeRequest },
    unknown
  >,
  'mutationFn'
>;

const useUpdateEpisode = ({ onSuccess, onError, ...rest }: UseUpdateEpisodeProps = {}) => {
  return useMutation({
    mutationFn: ({ episodeId, counselorId, data }) => api.V1.updateEpisode(episodeId, counselorId, data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useUpdateEpisode };
