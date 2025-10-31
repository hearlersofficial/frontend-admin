import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  authService,
  type TokenResponse,
} from '~/api/v1';

type UseRefreshTokenProps = Omit<
  UseMutationOptions<TokenResponse, Error, void, unknown>,
  'mutationFn'
>;

const useRefreshToken = ({ ...rest }: UseRefreshTokenProps = {}) => {
  return useMutation({
    mutationFn: () => authService.refreshToken(),
    ...rest,
  });
};

export { useRefreshToken };
