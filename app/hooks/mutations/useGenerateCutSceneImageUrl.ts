import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  counselorsService,
  type GenerateImageUrlRequest,
  type PresignedUrlResponse,
} from '~/api/v1';

type GenerateCutSceneImageUrlVariables = {
  counselorId: string;
  data: GenerateImageUrlRequest;
};

type UseGenerateCutSceneImageUrlProps = Omit<
  UseMutationOptions<PresignedUrlResponse, Error, GenerateCutSceneImageUrlVariables, unknown>,
  'mutationFn'
>;

export const useGenerateCutSceneImageUrl = ({ ...rest }: UseGenerateCutSceneImageUrlProps = {}) => {
  return useMutation({
    mutationFn: ({ counselorId, data }: GenerateCutSceneImageUrlVariables) =>
      counselorsService.generateCutSceneImageUrl(counselorId, data),
    ...rest,
  });
};
