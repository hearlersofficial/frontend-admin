import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  counselorsService,
  type GenerateImageUrlRequest,
  type PresignedUrlResponse,
} from '~/api/v1';

type GenerateCounselorImageUrlVariables = {
  counselorId: string;
  data: GenerateImageUrlRequest;
};

type UseGenerateCounselorImageUrlProps = Omit<
  UseMutationOptions<PresignedUrlResponse, Error, GenerateCounselorImageUrlVariables, unknown>,
  'mutationFn'
>;

const useGenerateCounselorImageUrl = ({ ...rest }: UseGenerateCounselorImageUrlProps = {}) => {
  return useMutation({
    mutationFn: ({ counselorId, data }: GenerateCounselorImageUrlVariables) =>
      counselorsService.generateCounselorImageUrl(counselorId, data),
    ...rest,
  });
};

export { useGenerateCounselorImageUrl };
