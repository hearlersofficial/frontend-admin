import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { UpdateCounselorData, UpdateCounselorError, UpdateCounselorRequest } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseUpdateCounselorProps = Omit<
  UseMutationOptions<
    AxiosResponse<UpdateCounselorData>,
    UpdateCounselorError,
    { counselorId: string; data: UpdateCounselorRequest },
    unknown
  >,
  'mutationFn'
>;

const useUpdateCounselor = ({ onSuccess, onError, ...rest }: UseUpdateCounselorProps = {}) => {
  return useMutation({
    mutationFn: ({ counselorId, data }) => api.V1.updateCounselor(counselorId, data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useUpdateCounselor };
