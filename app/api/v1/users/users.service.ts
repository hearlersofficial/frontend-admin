import { api } from '~/api';
import type { User, UserTracking } from './users.types';

export const usersService = {
  /**
   * 유저 단건 조회
   */
  getUser: async (userId: string): Promise<User> => {
    const response = await api.axios.get(`/v1/admin/users/${userId}`);
    return response.data.data.user;
  },

  /**
   * 유저 트래킹 조회
   */
  getUserTracking: async (userId: string): Promise<UserTracking> => {
    const response = await api.axios.get(`/v1/admin/users/${userId}/tracking`);
    return response.data.data.userTracking;
  },
};

