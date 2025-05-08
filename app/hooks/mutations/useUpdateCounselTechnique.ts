import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import {
  UpdateCounselTechniqueData,
  UpdateCounselTechniqueError,
  UpdateCounselTechniqueRequestDto,
} from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseUpdateCounselTechniqueProps = Omit<
  UseMutationOptions<
    AxiosResponse<UpdateCounselTechniqueData>,
    UpdateCounselTechniqueError,
    { counselTechniqueId: string; data: UpdateCounselTechniqueRequestDto },
    unknown
  >,
  'mutationFn'
>;

const useUpdateCounselTechnique = ({ onSuccess, onError, ...rest }: UseUpdateCounselTechniqueProps = {}) => {
  return useMutation({
    mutationFn: ({ counselTechniqueId, data }) => api.V1.updateCounselTechnique(counselTechniqueId, data),
    onSuccess: (...props) => {
      onSuccess?.(...props);
    },
    onError: (...props) => {
      onError?.(...props);
    },
    ...rest,
  });
};

export { useUpdateCounselTechnique };
