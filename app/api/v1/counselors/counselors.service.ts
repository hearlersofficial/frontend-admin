import { api } from '~/api';
import { extractData } from '../response.util';
import type {
  Tone,
  CreateToneRequest,
  UpdateToneRequest,
  GetTonesParams,
  Counselor,
  CreateCounselorRequest,
  UpdateCounselorRequest,
  GetCounselorsParams,
  Episode,
  CreateEpisodeRequest,
  UpdateEpisodeRequest,
  PresignedUrlResponse,
  GenerateImageUrlRequest,
  Bubble,
  CreateBubbleRequest,
  UpdateBubbleRequest,
} from './counselors.types';
import { ApiSuccessResponse } from '~/api/v1/response.types';

export const counselorsService = {
  // Tones
  getTone: async (toneId: string): Promise<Tone> => {
    const response = await api.axios.get<ApiSuccessResponse<{ tone: Tone }>>(`/v1/admin/tones/${toneId}`);
    return extractData(response).tone;
  },

  getTones: async (params?: GetTonesParams): Promise<Tone[]> => {
    const response = await api.axios.get<ApiSuccessResponse<{ tones: Tone[] }>>('/v1/admin/tones', { params });
    return extractData(response).tones;
  },

  createTone: async (data: CreateToneRequest): Promise<Tone> => {
    const response = await api.axios.post<ApiSuccessResponse<{ tone: Tone }>>('/v1/admin/tones', data);
    return extractData(response).tone;
  },

  updateTone: async (toneId: string, data: UpdateToneRequest): Promise<Tone> => {
    const response = await api.axios.put<ApiSuccessResponse<{ tone: Tone }>>(`/v1/admin/tones/${toneId}`, data);
    return extractData(response).tone;
  },

  // Counselors
  getCounselor: async (counselorId: string): Promise<Counselor> => {
    const response = await api.axios.get<ApiSuccessResponse<{ counselor: Counselor }>>(
      `/v1/admin/counselors/${counselorId}`,
    );
    return extractData(response).counselor;
  },

  getCounselors: async (params?: GetCounselorsParams): Promise<Counselor[]> => {
    const response = await api.axios.get<ApiSuccessResponse<{ counselors: Counselor[] }>>('/v1/admin/counselors', {
      params,
    });
    return extractData(response).counselors;
  },

  createCounselor: async (data: CreateCounselorRequest): Promise<Counselor> => {
    const response = await api.axios.post<ApiSuccessResponse<{ counselor: Counselor }>>('/v1/admin/counselors', data);
    return extractData(response).counselor;
  },

  updateCounselor: async (counselorId: string, data: UpdateCounselorRequest): Promise<Counselor> => {
    const response = await api.axios.put<ApiSuccessResponse<{ counselor: Counselor }>>(
      `/v1/admin/counselors/${counselorId}`,
      data,
    );
    return extractData(response).counselor;
  },

  generateCounselorImageUrl: async (
    counselorId: string,
    data: GenerateImageUrlRequest,
  ): Promise<PresignedUrlResponse> => {
    const response = await api.axios.post<ApiSuccessResponse<{ presignedUrl: PresignedUrlResponse }>>(
      `/v1/admin/counselors/${counselorId}/image-url`,
      data,
    );
    return extractData(response).presignedUrl;
  },

  // Episodes
  getEpisode: async (counselorId: string, episodeId: string): Promise<Episode> => {
    const response = await api.axios.get<ApiSuccessResponse<{ episode: Episode }>>(
      `/v1/admin/counselors/${counselorId}/episodes/${episodeId}`,
    );
    return extractData(response).episode;
  },

  getEpisodes: async (counselorId: string): Promise<Episode[]> => {
    const response = await api.axios.get<ApiSuccessResponse<{ episodes: Episode[] }>>(
      `/v1/admin/counselors/${counselorId}/episodes`,
    );
    return extractData(response).episodes;
  },

  createEpisode: async (counselorId: string, data: CreateEpisodeRequest): Promise<Episode> => {
        const response = await api.axios.post<ApiSuccessResponse<{ episode: Episode }>>(
      `/v1/admin/counselors/${counselorId}/episodes`,
      data,
    );
    return extractData(response).episode;
  },

  updateEpisode: async (
    counselorId: string,
    episodeId: string,
    data: UpdateEpisodeRequest,
  ): Promise<Episode> => {
    const response = await api.axios.put<ApiSuccessResponse<{ episode: Episode }>>(
      `/v1/admin/counselors/${counselorId}/episodes/${episodeId}`,
      data,
    );
      return extractData(response).episode;
  },

  generateCutSceneImageUrl: async (
    counselorId: string,
    data: GenerateImageUrlRequest,
  ): Promise<PresignedUrlResponse> => {
    const response = await api.axios.post<ApiSuccessResponse<{ presignedUrl: PresignedUrlResponse }>>(
      `/v1/admin/counselors/${counselorId}/episodes/image-url`,
      data,
    );
    return extractData(response).presignedUrl;
  },

  // Bubbles
  getBubble: async (counselorId: string, bubbleId: string): Promise<Bubble> => {
    const response = await api.axios.get<ApiSuccessResponse<{ bubble: Bubble }>>(
      `/v1/admin/counselors/${counselorId}/bubbles/${bubbleId}`,
    );
    return extractData(response).bubble;
  },

  getBubbles: async (counselorId: string): Promise<Bubble[]> => {
    const response = await api.axios.get<ApiSuccessResponse<{ bubbles: Bubble[] }>>(
      `/v1/admin/counselors/${counselorId}/bubbles`,
    );
    return extractData(response).bubbles;
  },

  getRandomBubble: async (counselorId: string): Promise<Bubble> => {
    const response = await api.axios.get<ApiSuccessResponse<{ bubble: Bubble }>>(
      `/v1/admin/counselors/${counselorId}/bubbles/random`,
    );
    return extractData(response).bubble;
  },

  createBubble: async (counselorId: string, data: CreateBubbleRequest): Promise<Bubble> => {
    const response = await api.axios.post<ApiSuccessResponse<{ bubble: Bubble }>>(
      `/v1/admin/counselors/${counselorId}/bubbles`,
      data,
    );
    return extractData(response).bubble;
  },

  updateBubble: async (counselorId: string, bubbleId: string, data: UpdateBubbleRequest): Promise<Bubble> => {
    const response = await api.axios.put<ApiSuccessResponse<{ bubble: Bubble }>>(
      `/v1/admin/counselors/${counselorId}/bubbles/${bubbleId}`,
      data,
    );
    return extractData(response).bubble;
  },
};

