import { useQuery } from '@tanstack/react-query';
import { queries } from '~/queries';

export const useEpisodes = (counselorId: string, enabled = true) => {
  return useQuery({
    ...queries.v1.getEpisodes(counselorId),
    enabled: enabled && !!counselorId,
    select: (response) => response.data.data?.episodes || [],
  });
}; 