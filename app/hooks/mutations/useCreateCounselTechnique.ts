import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  promptsService,
  type CreateCounselTechniqueRequest,
  type CounselTechnique,
} from '~/api/v1';

type UseCreateCounselTechniqueProps = Omit<
  UseMutationOptions<CounselTechnique, Error, CreateCounselTechniqueRequest, unknown>,
  'mutationFn'
>;

const useCreateCounselTechnique = ({ ...rest }: UseCreateCounselTechniqueProps = {}) => {
  return useMutation({
    mutationFn: (data: CreateCounselTechniqueRequest) => promptsService.createCounselTechnique(data),
    ...rest,
  });
};

export { useCreateCounselTechnique };
