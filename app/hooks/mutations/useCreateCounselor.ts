import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { CreateCounselorData, CreateCounselorError, CreateCounselorRequest } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseCreateCounselorProps = Omit<
  UseMutationOptions<AxiosResponse<CreateCounselorData>, CreateCounselorError, CreateCounselorRequest, unknown>,
  'mutationFn'
>;

const useCreateCounselor = ({ onSuccess, onError, ...rest }: UseCreateCounselorProps = {}) => {
  return useMutation({
    mutationFn: (data: CreateCounselorRequest) => api.V1.createCounselor(data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useCreateCounselor };
