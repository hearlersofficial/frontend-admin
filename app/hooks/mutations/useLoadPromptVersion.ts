import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { promptsService, type PromptVersion } from '~/api/v1';

type UseLoadPromptVersionProps = Omit<
  UseMutationOptions<PromptVersion, Error, string, unknown>,
  'mutationFn'
>;

const useLoadPromptVersion = ({ ...rest }: UseLoadPromptVersionProps = {}) => {
  return useMutation({
    mutationFn: (promptVersionId: string) => promptsService.loadPromptVersion(promptVersionId),
    ...rest,
  });
};

export { useLoadPromptVersion };
