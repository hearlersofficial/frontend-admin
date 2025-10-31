import { api } from '~/api';
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

export const counselorsService = {
  // Tones
  getTone: async (toneId: string): Promise<Tone> => {
    const response = await api.axios.get(`/v1/admin/tones/${toneId}`);
    return response.data.data.tone;
  },

  getTones: async (params?: GetTonesParams): Promise<Tone[]> => {
    const response = await api.axios.get('/v1/admin/tones', { params });
    return response.data.data.tones;
  },

  createTone: async (data: CreateToneRequest): Promise<Tone> => {
    const response = await api.axios.post('/v1/admin/tones', data);
    return response.data.data.tone;
  },

  updateTone: async (toneId: string, data: UpdateToneRequest): Promise<Tone> => {
    const response = await api.axios.put(`/v1/admin/tones/${toneId}`, data);
    return response.data.data.tone;
  },

  // Counselors
  getCounselor: async (counselorId: string): Promise<Counselor> => {
    const response = await api.axios.get(`/v1/admin/counselors/${counselorId}`);
    return response.data.data.counselor;
  },

  getCounselors: async (params?: GetCounselorsParams): Promise<Counselor[]> => {
    const response = await api.axios.get('/v1/admin/counselors', { params });
    return response.data.data.counselors;
  },

  createCounselor: async (data: CreateCounselorRequest): Promise<Counselor> => {
    const response = await api.axios.post('/v1/admin/counselors', data);
    return response.data.data.counselor;
  },

  updateCounselor: async (counselorId: string, data: UpdateCounselorRequest): Promise<Counselor> => {
    const response = await api.axios.put(`/v1/admin/counselors/${counselorId}`, data);
    return response.data.data.counselor;
  },

  generateCounselorImageUrl: async (
    counselorId: string,
    data: GenerateImageUrlRequest,
  ): Promise<PresignedUrlResponse> => {
    const response = await api.axios.post(`/v1/admin/counselors/${counselorId}/image-url`, data);
    return response.data.data.presignedUrl;
  },

  // Episodes
  getEpisode: async (counselorId: string, episodeId: string): Promise<Episode> => {
    const response = await api.axios.get(`/v1/admin/counselors/${counselorId}/episodes/${episodeId}`);
    return response.data.data.episode;
  },

  getEpisodes: async (counselorId: string): Promise<Episode[]> => {
    const response = await api.axios.get(`/v1/admin/counselors/${counselorId}/episodes`);
    return response.data.data.episodes;
  },

  createEpisode: async (counselorId: string, data: CreateEpisodeRequest): Promise<Episode> => {
    const response = await api.axios.post(`/v1/admin/counselors/${counselorId}/episodes`, data);
    return response.data.data.episode;
  },

  updateEpisode: async (
    counselorId: string,
    episodeId: string,
    data: UpdateEpisodeRequest,
  ): Promise<Episode> => {
    const response = await api.axios.put(`/v1/admin/counselors/${counselorId}/episodes/${episodeId}`, data);
    return response.data.data.episode;
  },

  generateCutSceneImageUrl: async (
    counselorId: string,
    data: GenerateImageUrlRequest,
  ): Promise<PresignedUrlResponse> => {
    const response = await api.axios.post(`/v1/admin/counselors/${counselorId}/episodes/image-url`, data);
    return response.data.data.presignedUrl;
  },

  // Bubbles
  getBubble: async (counselorId: string, bubbleId: string): Promise<Bubble> => {
    const response = await api.axios.get(`/v1/admin/counselors/${counselorId}/bubbles/${bubbleId}`);
    return response.data.data.bubble;
  },

  getBubbles: async (counselorId: string): Promise<Bubble[]> => {
    const response = await api.axios.get(`/v1/admin/counselors/${counselorId}/bubbles`);
    return response.data.data.bubbles;
  },

  getRandomBubble: async (counselorId: string): Promise<Bubble> => {
    const response = await api.axios.get(`/v1/admin/counselors/${counselorId}/bubbles/random`);
    return response.data.data.bubble;
  },

  createBubble: async (counselorId: string, data: CreateBubbleRequest): Promise<Bubble> => {
    const response = await api.axios.post(`/v1/admin/counselors/${counselorId}/bubbles`, data);
    return response.data.data.bubble;
  },

  updateBubble: async (counselorId: string, bubbleId: string, data: UpdateBubbleRequest): Promise<Bubble> => {
    const response = await api.axios.put(`/v1/admin/counselors/${counselorId}/bubbles/${bubbleId}`, data);
    return response.data.data.bubble;
  },
};

