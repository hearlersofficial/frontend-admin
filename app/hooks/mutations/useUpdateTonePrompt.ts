import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import {
  UpdateTonePromptData,
  UpdateTonePromptError,
  UpdateTonePromptRequestDto,
} from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseUpdateTonePromptProps = Omit<
  UseMutationOptions<AxiosResponse<UpdateTonePromptData>, UpdateTonePromptError, UpdateTonePromptRequestDto, unknown>,
  'mutationFn'
>;

const useUpdateTonePrompt = ({ onSuccess, onError, ...rest }: UseUpdateTonePromptProps = {}) => {
  return useMutation({
    mutationFn: (data: UpdateTonePromptRequestDto) => api.V1.updateTonePrompt(data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useUpdateTonePrompt };
