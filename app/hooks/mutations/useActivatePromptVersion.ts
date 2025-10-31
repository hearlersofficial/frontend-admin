import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  promptsService,
  type PromptVersion,
} from '~/api/v1';

type UseActivatePromptVersionProps = Omit<
  UseMutationOptions<PromptVersion, Error, string, unknown>,
  'mutationFn'
>;

const useActivatePromptVersion = ({ ...rest }: UseActivatePromptVersionProps = {}) => {
  return useMutation({
    mutationFn: (promptVersionId: string) => promptsService.activatePromptVersion(promptVersionId),
    ...rest,
  });
};

export { useActivatePromptVersion };
