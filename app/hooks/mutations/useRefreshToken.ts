import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { RefreshTokenData, RefreshTokenError } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseRefreshTokenProps = Omit<
  UseMutationOptions<AxiosResponse<RefreshTokenData>, RefreshTokenError, void, unknown>,
  'mutationFn'
>;

const useRefreshToken = ({ onSuccess, onError, ...rest }: UseRefreshTokenProps = {}) => {
  return useMutation({
    mutationFn: () => api.V1.refreshToken(),
    onSuccess: (...props) => {
      onSuccess?.(...props);
    },
    onError: (...props) => {
      onError?.(...props);
    },
    ...rest,
  });
};

export { useRefreshToken };
