import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { UpdateToneRequestDto, UpdateToneData, UpdateToneError } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseUpdateToneProps = Omit<
  UseMutationOptions<
    AxiosResponse<UpdateToneData>,
    UpdateToneError,
    { toneId: string; data: UpdateToneRequestDto },
    unknown
  >,
  'mutationFn'
>;

const useUpdateTone = ({ onSuccess, onError, ...rest }: UseUpdateToneProps = {}) => {
  return useMutation({
    mutationFn: ({ toneId, data }) => api.V1.updateTone(toneId, data),
    onSuccess: (...props) => {
      onSuccess?.(...props);
    },
    onError: (...props) => {
      onError?.(...props);
    },
    ...rest,
  });
};

export { useUpdateTone };
