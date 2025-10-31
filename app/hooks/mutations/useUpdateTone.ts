import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  counselorsService,
  type UpdateToneRequest,
  type Tone,
} from '~/api/v1';

type UpdateToneVariables = {
  toneId: string;
  data: UpdateToneRequest;
};

type UseUpdateToneProps = Omit<
  UseMutationOptions<Tone, Error, UpdateToneVariables, unknown>,
  'mutationFn'
>;

const useUpdateTone = ({ ...rest }: UseUpdateToneProps = {}) => {
  return useMutation({
    mutationFn: ({ toneId, data }: UpdateToneVariables) => counselorsService.updateTone(toneId, data),
    ...rest,
  });
};

export { useUpdateTone };
