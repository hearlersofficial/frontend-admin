import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  promptsService,
  type CreateCounselTechniqueTransitionRuleRequest,
  type CounselTechniqueTransitionRule
} from '~/api/v1';


type UseCreateCounselTechniqueTransitionRuleProps = Omit<
  UseMutationOptions<CounselTechniqueTransitionRule, Error, CreateCounselTechniqueTransitionRuleRequest, unknown>,
  'mutationFn'
>;

const useCreateCounselTechniqueTransitionRule = ({ ...rest }: UseCreateCounselTechniqueTransitionRuleProps = {}) => {
  return useMutation({
    mutationFn: (data: CreateCounselTechniqueTransitionRuleRequest) =>
      promptsService.createCounselTechniqueTransitionRule(data),
    ...rest,
  });
};

export { useCreateCounselTechniqueTransitionRule };
