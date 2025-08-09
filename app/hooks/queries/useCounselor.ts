import { useQuery } from '@tanstack/react-query';
import { queries } from '~/queries';

export const useCounselor = (counselorId: string, enabled = true) => {
  return useQuery({
    ...queries.v1.getCounselor(counselorId),
    enabled: enabled && !!counselorId,
    select: (response) => response.data.data?.counselor || null,
  });
}; 