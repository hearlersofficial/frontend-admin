import { useQuery } from '@tanstack/react-query';
import { queries } from '~/queries';
import { GetCounselorsParams } from '~/__generated__/data-contracts';

export const useCounselors = (params: GetCounselorsParams = {}) => {
  return useQuery({
    ...queries.v1.getCounselors(params),
    select: (response) => response.data.data?.counselors || [],
  });
}; 