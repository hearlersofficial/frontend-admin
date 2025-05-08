import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import {
  SaveCounselTechniqueSequenceData,
  SaveCounselTechniqueSequenceError,
  SaveCounselTechniqueSequenceRequestDto,
} from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseSaveCounselTechniqueSequenceProps = Omit<
  UseMutationOptions<
    AxiosResponse<SaveCounselTechniqueSequenceData>,
    SaveCounselTechniqueSequenceError,
    SaveCounselTechniqueSequenceRequestDto,
    unknown
  >,
  'mutationFn'
>;

const useSaveCounselTechniqueSequence = ({
  onSuccess,
  onError,
  ...rest
}: UseSaveCounselTechniqueSequenceProps = {}) => {
  return useMutation({
    mutationFn: (data: SaveCounselTechniqueSequenceRequestDto) => api.V1.saveCounselTechniqueSequence(data),
    onSuccess: (...props) => {
      onSuccess?.(...props);
    },
    onError: (...props) => {
      onError?.(...props);
    },
    ...rest,
  });
};

export { useSaveCounselTechniqueSequence };
