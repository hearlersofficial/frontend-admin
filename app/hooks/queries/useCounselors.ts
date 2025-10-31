import { useQuery } from '@tanstack/react-query';
import { queries } from '~/queries';
import { data } from '@remix-run/react';
import { GetCounselorsParams } from '~/api/v1/counselors/counselors.types';

export const useCounselors = (params?: GetCounselorsParams) => {
  return useQuery({
    ...queries.v1.getCounselors(params),
    select: data
  });
}; 