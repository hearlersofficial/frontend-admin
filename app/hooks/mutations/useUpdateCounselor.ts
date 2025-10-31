import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  counselorsService,
  type UpdateCounselorRequest,
  type Counselor,
} from '~/api/v1';

type UpdateCounselorVariables = {
  counselorId: string;
  data: UpdateCounselorRequest;
};

type UseUpdateCounselorProps = Omit<
  UseMutationOptions<Counselor, Error, UpdateCounselorVariables, unknown>,
  'mutationFn'
>;

const useUpdateCounselor = ({ ...rest }: UseUpdateCounselorProps = {}) => {
  return useMutation({
    mutationFn: ({ counselorId, data }: UpdateCounselorVariables) =>
      counselorsService.updateCounselor(counselorId, data),
    ...rest,
  });
};

export { useUpdateCounselor };
