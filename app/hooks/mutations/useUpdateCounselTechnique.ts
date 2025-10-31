import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  promptsService,
  type UpdateCounselTechniqueRequest,
  type CounselTechnique,
} from '~/api/v1';

type UpdateCounselTechniqueVariables = {
  counselTechniqueId: string;
  data: UpdateCounselTechniqueRequest;
};

type UseUpdateCounselTechniqueProps = Omit<
  UseMutationOptions<CounselTechnique[], Error, UpdateCounselTechniqueVariables, unknown>,
  'mutationFn'
>;

const useUpdateCounselTechnique = ({ ...rest }: UseUpdateCounselTechniqueProps = {}) => {
  return useMutation({
    mutationFn: ({ counselTechniqueId, data }: UpdateCounselTechniqueVariables) =>
      promptsService.updateCounselTechnique(counselTechniqueId, data),
    ...rest,
  });
};

export { useUpdateCounselTechnique };
