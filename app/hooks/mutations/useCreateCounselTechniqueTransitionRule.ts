import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import {
  CreateCounselTechniqueTransitionRuleData,
  CreateCounselTechniqueTransitionRuleError,
  CreateCounselTechniqueTransitionRuleRequestDto,
} from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseCreateCounselTechniqueTransitionRuleProps = Omit<
  UseMutationOptions<
    AxiosResponse<CreateCounselTechniqueTransitionRuleData>,
    CreateCounselTechniqueTransitionRuleError,
    CreateCounselTechniqueTransitionRuleRequestDto,
    unknown
  >,
  'mutationFn'
>;

const useCreateCounselTechniqueTransitionRule = ({
  onSuccess,
  onError,
  ...rest
}: UseCreateCounselTechniqueTransitionRuleProps = {}) => {
  return useMutation({
    mutationFn: (data: CreateCounselTechniqueTransitionRuleRequestDto) =>
      api.V1.createCounselTechniqueTransitionRule(data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useCreateCounselTechniqueTransitionRule };
