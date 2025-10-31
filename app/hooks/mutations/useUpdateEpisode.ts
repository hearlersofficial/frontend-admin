import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  counselorsService,
  type UpdateEpisodeRequest,
  type Episode,
} from '~/api/v1';

type UpdateEpisodeVariables = {
  counselorId: string;
  episodeId: string;
  data: UpdateEpisodeRequest;
};

type UseUpdateEpisodeProps = Omit<
  UseMutationOptions<Episode, Error, UpdateEpisodeVariables, unknown>,
  'mutationFn'
>;

const useUpdateEpisode = ({ ...rest }: UseUpdateEpisodeProps = {}) => {
  return useMutation({
    mutationFn: ({ counselorId, episodeId, data }: UpdateEpisodeVariables) =>
      counselorsService.updateEpisode(counselorId, episodeId, data),
    ...rest,
  });
};

export { useUpdateEpisode };
