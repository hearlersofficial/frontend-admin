import { data } from '@remix-run/react';
import { useQuery } from '@tanstack/react-query';
import { queries } from '~/queries';

export const useEpisodeDetail = (episodeId: string, counselorId: string, enabled = true) => {
  return useQuery({
    ...queries.v1.getEpisode(episodeId, counselorId),
    enabled: enabled && !!episodeId && !!counselorId,
    select: data
  });
}; 