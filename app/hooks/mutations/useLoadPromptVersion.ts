import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { LoadPromptVersionData, LoadPromptVersionError } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseLoadPromptVersionProps = Omit<
  UseMutationOptions<AxiosResponse<LoadPromptVersionData>, LoadPromptVersionError, string, unknown>,
  'mutationFn'
>;

const useLoadPromptVersion = ({ onSuccess, onError, ...rest }: UseLoadPromptVersionProps = {}) => {
  return useMutation({
    mutationFn: (promptVersionId: string) => api.V1.loadPromptVersion(promptVersionId),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useLoadPromptVersion };
