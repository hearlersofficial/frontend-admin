import { type UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { queries } from '~/queries';
import { promptsService, PromptVersion, SaveVersionRequest } from '~/api/v1';

type UseSaveVersionProps = Omit<
  UseMutationOptions<PromptVersion, Error, SaveVersionRequest, unknown>,
  'mutationFn'
>;

const useSaveVersion = ({ onSuccess, onError, ...rest }: UseSaveVersionProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveVersionRequest) => promptsService.saveVersion(data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: queries.v1.getPromptVersions().queryKey });
      onSuccess?.(...args);
    },
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useSaveVersion };
