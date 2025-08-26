import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import {
  UpdateCounselTechniqueTransitionRuleData,
  UpdateCounselTechniqueTransitionRuleError,
  UpdateCounselTechniqueTransitionRuleRequestDto,
} from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseUpdateCounselTechniqueTransitionRuleProps = Omit<
  UseMutationOptions<
    AxiosResponse<UpdateCounselTechniqueTransitionRuleData>,
    UpdateCounselTechniqueTransitionRuleError,
    { counselTechniqueTransitionRuleId: string; data: UpdateCounselTechniqueTransitionRuleRequestDto },
    unknown
  >,
  'mutationFn'
>;

const useUpdateCounselTechniqueTransitionRule = ({
  onSuccess,
  onError,
  ...rest
}: UseUpdateCounselTechniqueTransitionRuleProps = {}) => {
  return useMutation({
    mutationFn: ({ counselTechniqueTransitionRuleId, data }) =>
      api.V1.updateCounselTechniqueTransitionRule(counselTechniqueTransitionRuleId, data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useUpdateCounselTechniqueTransitionRule };
