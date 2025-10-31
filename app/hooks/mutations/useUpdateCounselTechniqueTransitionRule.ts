import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  promptsService,
  type UpdateCounselTechniqueTransitionRuleRequest,
  type CounselTechniqueTransitionRule,
} from '~/api/v1';

type UpdateCounselTechniqueTransitionRuleVariables = {
  transitionRuleId: string;
  data: UpdateCounselTechniqueTransitionRuleRequest;
};

type UseUpdateCounselTechniqueTransitionRuleProps = Omit<
  UseMutationOptions<CounselTechniqueTransitionRule, Error, UpdateCounselTechniqueTransitionRuleVariables, unknown>,
  'mutationFn'
>;

const useUpdateCounselTechniqueTransitionRule = ({ ...rest }: UseUpdateCounselTechniqueTransitionRuleProps = {}) => {
  return useMutation({
    mutationFn: ({ transitionRuleId, data }: UpdateCounselTechniqueTransitionRuleVariables) =>
      promptsService.updateCounselTechniqueTransitionRule(transitionRuleId, data),
    ...rest,
  });
};

export { useUpdateCounselTechniqueTransitionRule };
