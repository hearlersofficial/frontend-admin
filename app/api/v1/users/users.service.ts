import { api } from '~/api';
import type { User, UserTracking } from './users.types';
import { extractData } from '../response.util';

export const usersService = {
  /**
   * 유저 단건 조회
   */
  getUser: async (userId: string): Promise<User> => {
    const response = await api.axios.get(`/v1/admin/users/${userId}`);
    return extractData<User>(response);
  },

  getMyUser: async (): Promise<User> => {
    const response = await api.axios.get(`/v1/users/me`);
    return extractData<User>(response);
  },

  /**
   * 유저 트래킹 조회
   */
  getUserTracking: async (userId: string): Promise<UserTracking> => {
    const response = await api.axios.get(`/v1/admin/users/${userId}/tracking`);
    return extractData<UserTracking>(response);
  },
};

