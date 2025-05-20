import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { SaveTemporaryVersionRequestDto, SaveVersionData, SaveVersionError } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseSaveVersionProps = Omit<
  UseMutationOptions<AxiosResponse<SaveVersionData>, SaveVersionError, SaveTemporaryVersionRequestDto, unknown>,
  'mutationFn'
>;

const useSaveVersion = ({ onSuccess, onError, ...rest }: UseSaveVersionProps = {}) => {
  return useMutation({
    mutationFn: (data: SaveTemporaryVersionRequestDto) => api.V1.saveVersion(data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useSaveVersion };
