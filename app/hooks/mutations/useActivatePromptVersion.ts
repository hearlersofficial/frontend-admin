import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { ActivatePromptVersionData, ActivatePromptVersionError } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseActivatePromptVersionProps = Omit<
  UseMutationOptions<AxiosResponse<ActivatePromptVersionData>, ActivatePromptVersionError, string, unknown>,
  'mutationFn'
>;

const useActivatePromptVersion = ({ onSuccess, onError, ...rest }: UseActivatePromptVersionProps = {}) => {
  return useMutation({
    mutationFn: (promptVersionId: string) => api.V1.activatePromptVersion(promptVersionId),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useActivatePromptVersion };
