import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { UpdateToneData, UpdateToneError, UpdateToneRequest } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseUpdateToneProps = Omit<
  UseMutationOptions<
    AxiosResponse<UpdateToneData>,
    UpdateToneError,
    { toneId: string; data: UpdateToneRequest },
    unknown
  >,
  'mutationFn'
>;

const useUpdateTone = ({ onSuccess, onError, ...rest }: UseUpdateToneProps = {}) => {
  return useMutation({
    mutationFn: ({ toneId, data }) => api.V1.updateTone(toneId, data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useUpdateTone };
