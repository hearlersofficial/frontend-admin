import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  counselorsService,
  type CreateToneRequest,
  type Tone,
} from '~/api/v1';

type UseCreateToneProps = Omit<
  UseMutationOptions<Tone, Error, CreateToneRequest, unknown>,
  'mutationFn'
>;

const useCreateTone = ({ ...rest }: UseCreateToneProps = {}) => {
  return useMutation({
    mutationFn: (data: CreateToneRequest) => counselorsService.createTone(data),
    ...rest,
  });
};

export { useCreateTone };
