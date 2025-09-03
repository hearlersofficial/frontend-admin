import { useQueryClient } from '@tanstack/react-query';
import { useCreateCounselTechniqueTransitionRule, useUpdateCounselTechniqueTransitionRule } from '~/hooks/mutations';
import {
  CreateCounselTechniqueTransitionRuleRequestDto,
  UpdateCounselTechniqueTransitionRuleRequestDto,
} from '~/__generated__/data-contracts';
import { queries } from '~/queries';
import { useDeleteCounselTechniqueTransitionRule } from '~/hooks/mutations/useDeleteCounselTechniqueTransitionRule';
import { usePromptStore } from '~/store/usePromptStore';

export const useTransitionRuleManagement = () => {
  const temporaryVersionId = usePromptStore((s) => s.temporaryVersion?.id);

  const queryClient = useQueryClient();
  const { mutate: createTransitionRule } = useCreateCounselTechniqueTransitionRule({
    onSuccess: () => {
      // 성공 시 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: queries.v1.getCounselTechniqueTransitionRules({
          promptVersionId: temporaryVersionId!,
        }).queryKey,
      });
    },
  });

  const { mutate: updateTransitionRule } = useUpdateCounselTechniqueTransitionRule({
    onSuccess: (res) => {
      // 성공 시 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: queries.v1.getCounselTechniqueTransitionRules({
          promptVersionId: res.data?.data?.counselTechniqueTransitionRule?.promptVersionId ?? '',
        }).queryKey,
      });
    },
  });

  const { mutate: deleteTransitionRule } = useDeleteCounselTechniqueTransitionRule({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queries.v1.getCounselTechniqueTransitionRules({
          promptVersionId: temporaryVersionId!,
        }).queryKey,
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

  const handleDeleteTransitionRule = (transitionRuleId: string) => {
    deleteTransitionRule(transitionRuleId);
  };

  return {
    handleCreateTransitionRule,
    handleUpdateTransitionRule,
    handleDeleteTransitionRule,
  };
};
