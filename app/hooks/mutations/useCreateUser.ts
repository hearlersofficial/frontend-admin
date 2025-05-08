import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { CreateUserData, CreateUserError } from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseCreateUserProps = Omit<
  UseMutationOptions<AxiosResponse<CreateUserData>, CreateUserError, void, unknown>,
  'mutationFn'
>;

const useCreateUser = ({ onSuccess, onError, ...rest }: UseCreateUserProps = {}) => {
  return useMutation({
    mutationFn: () => api.V1.createUser(),
    onSuccess: (...props) => {
      onSuccess?.(...props);
    },
    onError: (...props) => {
      onError?.(...props);
    },
    ...rest,
  });
};

export { useCreateUser };
