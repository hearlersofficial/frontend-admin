import { type UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { SaveTemporaryVersionRequestDto, SaveVersionData, SaveVersionError } from '~/__generated__/data-contracts';
import { api } from '~/api';
import { queries } from '~/queries';

type UseSaveVersionProps = Omit<
  UseMutationOptions<AxiosResponse<SaveVersionData>, SaveVersionError, SaveTemporaryVersionRequestDto, unknown>,
  'mutationFn'
>;

const useSaveVersion = ({ onSuccess, onError, ...rest }: UseSaveVersionProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveTemporaryVersionRequestDto) => api.V1.saveVersion(data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: queries.v1.getPromptVersions({}).queryKey });
      onSuccess?.(...args);
    },
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useSaveVersion };
