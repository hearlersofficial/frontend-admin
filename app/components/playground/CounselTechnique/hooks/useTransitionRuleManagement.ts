import { useQueryClient } from '@tanstack/react-query';
import { useCreateCounselTechniqueTransitionRule, useUpdateCounselTechniqueTransitionRule } from '~/hooks/mutations';

import { CreateCounselTechniqueTransitionRuleRequest, type UpdateCounselTechniqueTransitionRuleRequest } from '~/api/v1';
import { queries } from '~/queries';
import { useDeleteCounselTechniqueTransitionRule } from '~/hooks/mutations/useDeleteCounselTechniqueTransitionRule';
import { usePromptStore } from '~/stores/usePromptStore';

export const useTransitionRuleManagement = () => {
  const temporaryVersionId = usePromptStore((s) => s.temporaryVersion?.id);

  const queryClient = useQueryClient();
  const { mutate: createTransitionRule } = useCreateCounselTechniqueTransitionRule({
    onSuccess: () => {
      // 성공 시 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: queries.v1.getCounselTechniqueTransitionRules({
          promptVersionId: temporaryVersionId!,
          fromCounselTechniqueId: null,
          toCounselTechniqueId: null,
        }).queryKey,
      });
    },
  });

  const { mutate: updateTransitionRule } = useUpdateCounselTechniqueTransitionRule({
    onSuccess: (res) => {
      // 성공 시 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: queries.v1.getCounselTechniqueTransitionRules({
          promptVersionId: res.promptVersionId ?? '',
          fromCounselTechniqueId: null,
          toCounselTechniqueId: null,
        }).queryKey,
      });
    },
  });

  const { mutate: deleteTransitionRule } = useDeleteCounselTechniqueTransitionRule({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queries.v1.getCounselTechniqueTransitionRules({
          promptVersionId: temporaryVersionId!,
          fromCounselTechniqueId: null,
          toCounselTechniqueId: null,
        }).queryKey,
      });
    },
  });

  const handleCreateTransitionRule = (data: CreateCounselTechniqueTransitionRuleRequest) => {
    createTransitionRule(data);
  };

  const handleUpdateTransitionRule = (
    transitionRuleId: string,
    data: UpdateCounselTechniqueTransitionRuleRequest
  ) => {
    updateTransitionRule({ transitionRuleId, data });
  };

  const handleDeleteTransitionRule = (transitionRuleId: string) => {
    deleteTransitionRule(transitionRuleId);
  };

  return {
    handleCreateTransitionRule,
    handleUpdateTransitionRule,
    handleDeleteTransitionRule,
  };
};
