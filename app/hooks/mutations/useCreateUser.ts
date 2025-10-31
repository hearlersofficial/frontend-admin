import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  authService,
  type TokenResponse,
} from '~/api/v1';

type UseCreateUserProps = Omit<
  UseMutationOptions<TokenResponse, Error, void, unknown>,
  'mutationFn'
>;

const useCreateUser = ({ ...rest }: UseCreateUserProps = {}) => {
  return useMutation({
    mutationFn: () => authService.createUser(),
    ...rest,
  });
};

export { useCreateUser };
