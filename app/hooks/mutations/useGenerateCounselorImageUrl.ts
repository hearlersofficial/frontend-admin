import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import {
  GenerateCounselorImageUrlData,
  GenerateCounselorImageUrlError,
  GenerateCounselorImageUrlRequest,
} from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseGenerateCounselorImageUrlProps = Omit<
  UseMutationOptions<
    AxiosResponse<GenerateCounselorImageUrlData>,
    GenerateCounselorImageUrlError,
    { counselorId: string; data: GenerateCounselorImageUrlRequest },
    unknown
  >,
  'mutationFn'
>;

const useGenerateCounselorImageUrl = ({ onSuccess, onError, ...rest }: UseGenerateCounselorImageUrlProps = {}) => {
  return useMutation({
    mutationFn: ({ counselorId, data }) => api.V1.generateCounselorImageUrl(counselorId, data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useGenerateCounselorImageUrl };
