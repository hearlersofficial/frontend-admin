import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  counselorsService,
  type CreateEpisodeRequest,
  type Episode,
} from '~/api/v1';

type CreateEpisodeVariables = {
  counselorId: string;
  data: CreateEpisodeRequest;
};

type UseCreateEpisodeProps = Omit<
  UseMutationOptions<Episode, Error, CreateEpisodeVariables, unknown>,
  'mutationFn'
>;

const useCreateEpisode = ({ ...rest }: UseCreateEpisodeProps = {}) => {
  return useMutation({
    mutationFn: ({ counselorId, data }: CreateEpisodeVariables) =>
      counselorsService.createEpisode(counselorId, data),
    ...rest,
  });
};

export { useCreateEpisode };
