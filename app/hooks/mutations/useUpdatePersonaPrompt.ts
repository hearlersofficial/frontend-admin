import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  promptsService,
  type UpdatePersonaPromptRequest,
  type PersonaPrompt,
} from '~/api/v1';

type UseUpdatePersonaPromptProps = Omit<
  UseMutationOptions<PersonaPrompt, Error, UpdatePersonaPromptRequest, unknown>,
  'mutationFn'
>;

const useUpdatePersonaPrompt = ({ ...rest }: UseUpdatePersonaPromptProps = {}) => {
  return useMutation({
    mutationFn: (data: UpdatePersonaPromptRequest) => promptsService.updatePersonaPrompt(data),
    ...rest,
  });
};

export { useUpdatePersonaPrompt };
