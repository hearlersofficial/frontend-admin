import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import {
  DeleteCounselTechniqueTransitionRuleData,
  DeleteCounselTechniqueTransitionRuleError,
} from '~/__generated__/data-contracts';

import { api } from '~/api';

type UseDeleteCounselTechniqueTransitionRuleProps = Omit<
  UseMutationOptions<
    AxiosResponse<DeleteCounselTechniqueTransitionRuleData>,
    DeleteCounselTechniqueTransitionRuleError,
    string,
    unknown
  >,
  'mutationFn'
>;

const useDeleteCounselTechniqueTransitionRule = ({
  onSuccess,
  onError,
  ...rest
}: UseDeleteCounselTechniqueTransitionRuleProps = {}) => {
  return useMutation({
    mutationFn: (counselTechniqueTransitionRuleId: string) =>
      api.V1.deleteCounselTechniqueTransitionRule(counselTechniqueTransitionRuleId),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useDeleteCounselTechniqueTransitionRule };
