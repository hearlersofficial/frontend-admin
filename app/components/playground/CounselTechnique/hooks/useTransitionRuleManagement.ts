import { useQueryClient } from '@tanstack/react-query';
import { useCreateCounselTechniqueTransitionRule, useUpdateCounselTechniqueTransitionRule } from '~/hooks/mutations';
import {
  CreateCounselTechniqueTransitionRuleRequestDto,
  UpdateCounselTechniqueTransitionRuleRequestDto,
} from '~/__generated__/data-contracts';

export const useTransitionRuleManagement = () => {
  const queryClient = useQueryClient();

  const { mutate: createTransitionRule } = useCreateCounselTechniqueTransitionRule({
    onSuccess: (res) => {
      // 성공 시 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['counselTechniqueTransitionRules'],
      });
    },
  });

  const { mutate: updateTransitionRule } = useUpdateCounselTechniqueTransitionRule({
    onSuccess: (res) => {
      // 성공 시 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['counselTechniqueTransitionRules'],
      });
    },
  });

  const handleCreateTransitionRule = (data: CreateCounselTechniqueTransitionRuleRequestDto) => {
    createTransitionRule(data);
  };

  const handleUpdateTransitionRule = (
    transitionRuleId: string,
    data: UpdateCounselTechniqueTransitionRuleRequestDto
  ) => {
    updateTransitionRule({ counselTechniqueTransitionRuleId: transitionRuleId, data });
  };

  return {
    handleCreateTransitionRule,
    handleUpdateTransitionRule,
  };
};
