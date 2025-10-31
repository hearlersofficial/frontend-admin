import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { promptsService } from '~/api/v1';

type UseDeleteCounselTechniqueTransitionRuleProps = Omit<
  UseMutationOptions<boolean, Error, string, unknown>,
  'mutationFn'
>;

const useDeleteCounselTechniqueTransitionRule = ({
  ...rest
}: UseDeleteCounselTechniqueTransitionRuleProps = {}) => {
  return useMutation({
    mutationFn: (transitionRuleId: string) =>
      promptsService.deleteCounselTechniqueTransitionRule(transitionRuleId),
    ...rest,
  });
};

export { useDeleteCounselTechniqueTransitionRule };
