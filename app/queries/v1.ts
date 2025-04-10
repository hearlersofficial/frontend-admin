import { createQueryKeys } from '@lukemorales/query-key-factory';

import { api } from '~/api';
import {
  GetTonesParams,
  GetCounselTechniquesParams,
  GetCounselorsParams,
  KakaoCallbackParams,
} from '~/__generated__/data-contracts';

const v1QueryKeys = createQueryKeys('v1', {
  getTone: (toneId: string) => ({
    queryKey: [toneId],
    queryFn: () => api.V1.getTone(toneId),
  }),
  getCounselTechnique: (counselTechniqueId: string) => ({
    queryKey: [counselTechniqueId],
    queryFn: () => api.V1.getCounselTechnique(counselTechniqueId),
  }),
  getTones: (query: GetTonesParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.getTones(query),
  }),
  getCounselTechniques: (query: GetCounselTechniquesParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.getCounselTechniques(query),
  }),
  getCounselors: (query: GetCounselorsParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.getCounselors(query),
  }),
  kakaoCallback: (query: KakaoCallbackParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.kakaoCallback(query),
  }),
});

export { v1QueryKeys };
