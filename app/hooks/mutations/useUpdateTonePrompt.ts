import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  promptsService,
  type UpdateTonePromptRequest,
  type TonePrompt,
} from '~/api/v1';

type UseUpdateTonePromptProps = Omit<
  UseMutationOptions<TonePrompt, Error, UpdateTonePromptRequest, unknown>,
  'mutationFn'
>;

const useUpdateTonePrompt = ({ ...rest }: UseUpdateTonePromptProps = {}) => {
  return useMutation({
    mutationFn: (data: UpdateTonePromptRequest) => promptsService.updateTonePrompt(data),
    ...rest,
  });
};

export { useUpdateTonePrompt };
