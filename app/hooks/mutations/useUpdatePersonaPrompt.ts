import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import {
  UpdatePersonaPromptRequestDto,
  UpdatePersonaPromptData,
  UpdatePersonaPromptError,
} from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseUpdatePersonaPromptProps = Omit<
  UseMutationOptions<
    AxiosResponse<UpdatePersonaPromptData>,
    UpdatePersonaPromptError,
    UpdatePersonaPromptRequestDto,
    unknown
  >,
  'mutationFn'
>;

const useUpdatePersonaPrompt = ({ onSuccess, onError, ...rest }: UseUpdatePersonaPromptProps = {}) => {
  return useMutation({
    mutationFn: (data: UpdatePersonaPromptRequestDto) => api.V1.updatePersonaPrompt(data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useUpdatePersonaPrompt };
