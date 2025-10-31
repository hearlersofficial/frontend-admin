import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  counselorsService,
  type CreateCounselorRequest,
  type Counselor,
} from '~/api/v1';

type UseCreateCounselorProps = Omit<
  UseMutationOptions<Counselor, Error, CreateCounselorRequest, unknown>,
  'mutationFn'
>;

const useCreateCounselor = ({ ...rest }: UseCreateCounselorProps = {}) => {
  return useMutation({
    mutationFn: (data: CreateCounselorRequest) => counselorsService.createCounselor(data),
    ...rest,
  });
};

export { useCreateCounselor };
