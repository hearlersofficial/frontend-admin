import { api } from '~/api';
import { extractData } from '../response.util';
import type {
  Counsel,
  CreateCounselRequest,
  GetCounselsParams,
  CounselMessage,
  CreateMessageRequest,
  CreateMessageResponse,
  ReactMessageRequest,
  ReactMessageResponse,
  CounselorUserRelationship,
  GetCounselorUserRelationshipsParams,
} from './counsels.types';
import { ApiSuccessResponse } from '../response.types';

export const counselsService = {
  /**
   * 상담 단건 조회
   */
  getCounsel: async (counselId: string): Promise<Counsel> => {
    const response = await api.axios.get<ApiSuccessResponse<{ counsel: Counsel }>>(`/v1/admin/counsels/${counselId}`);
    return extractData(response).counsel;
  },

  /**
   * 상담 목록 조회
   */
  getCounsels: async (params?: GetCounselsParams): Promise<Counsel[]> => {
    const response = await api.axios.get<ApiSuccessResponse<{ counsels: Counsel[] }>>('/v1/admin/counsels', { params });
    return extractData(response).counsels;
  },

  /**
   * 상담 생성
   */
  createCounsel: async (
    userId: string,
    counselorId: string,
    data: CreateCounselRequest,
  ): Promise<{ counsel: Counsel; counselMessages: CounselMessage[] }> => {
    const response = await api.axios.post<
      ApiSuccessResponse<{ counsel: Counsel; counselMessages: CounselMessage[] }>
    >('/v1/admin/counsels', data, {
      params: { userId, counselorId },
    });
    return extractData(response);
  },

  /**
   * 메시지 목록 조회
   */
  getMessages: async (counselId: string): Promise<CounselMessage[]> => {
    const response = await api.axios.get<ApiSuccessResponse<{ counselMessages: CounselMessage[] }>>(
      `/v1/admin/counsels/${counselId}/messages`,
    );
    return extractData(response).counselMessages;
  },

  /**
   * 메시지 생성
   */
  createMessage: async (counselId: string, data: CreateMessageRequest): Promise<CreateMessageResponse> => {
    const response = await api.axios.post<ApiSuccessResponse<CreateMessageResponse>>(
      `/v1/admin/counsels/${counselId}/messages`,
      data,
    );
    return extractData(response);
  },

  /**
   * 메시지 반응
   */
  reactMessage: async (messageId: string, data: ReactMessageRequest): Promise<ReactMessageResponse> => {
    const response = await api.axios.post<ApiSuccessResponse<ReactMessageResponse>>(
      `/v1/admin/messages/${messageId}/react`,
      data,
    );
    return extractData(response);
  },

  /**
   * 상담사와 사용자 관계 조회
   */
  getCounselorUserRelationships: async (
    params?: GetCounselorUserRelationshipsParams,
  ): Promise<CounselorUserRelationship[]> => {
    const response = await api.axios.get<ApiSuccessResponse<CounselorUserRelationship[]>>(
      '/v1/admin/counselor-user-relationships',
      { params },
    );
    return extractData(response);
  },
};

