import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import {
  CreateCounselTechniqueData,
  CreateCounselTechniqueError,
  CreateCounselTechniqueRequestDto,
} from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseCreateCounselTechniqueProps = Omit<
  UseMutationOptions<
    AxiosResponse<CreateCounselTechniqueData>,
    CreateCounselTechniqueError,
    CreateCounselTechniqueRequestDto,
    unknown
  >,
  'mutationFn'
>;

const useCreateCounselTechnique = ({ onSuccess, onError, ...rest }: UseCreateCounselTechniqueProps = {}) => {
  return useMutation({
    mutationFn: (data: CreateCounselTechniqueRequestDto) => api.V1.createCounselTechnique(data),
    onSuccess: (...props) => {
      onSuccess?.(...props);
    },
    onError: (...props) => {
      onError?.(...props);
    },
    ...rest,
  });
};

export { useCreateCounselTechnique };
