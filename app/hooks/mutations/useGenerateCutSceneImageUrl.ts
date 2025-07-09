import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import {
  GenerateCutSceneImageUrlData,
  GenerateCutSceneImageUrlError,
  GenerateCutSceneImageUrlRequest,
} from '~/__generated__/data-contracts';
import { api } from '~/api';

type UseGenerateCutSceneImageUrlProps = Omit<
  UseMutationOptions<
    AxiosResponse<GenerateCutSceneImageUrlData>,
    GenerateCutSceneImageUrlError,
    { episodeId: string; counselorId: string; data: GenerateCutSceneImageUrlRequest },
    unknown
  >,
  'mutationFn'
>;

const useGenerateCutSceneImageUrl = ({ onSuccess, onError, ...rest }: UseGenerateCutSceneImageUrlProps = {}) => {
  return useMutation({
    mutationFn: ({ episodeId, counselorId, data }) => api.V1.generateCutSceneImageUrl(episodeId, counselorId, data),
    onSuccess: (...args) => onSuccess?.(...args),
    onError: (...args) => onError?.(...args),
    ...rest,
  });
};

export { useGenerateCutSceneImageUrl };
