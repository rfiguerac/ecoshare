import { ecoshareApi } from "../api/ecoshareApi";

import type {
  User,
  UserCredential,
  NewUser,
  UserUpdate,
  PasswordChange,
} from "../domain/interfaces/User";
import type { UserRepository } from "../domain/repositories/userRepository";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No access token found");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const userRepositoryImpl: UserRepository = {
  login: async (credentials: UserCredential): Promise<User> => {
    const response = await ecoshareApi.post("/auth/login", credentials);
    return response.data;
  },

  register: async (newUser: NewUser): Promise<User> => {
    const response = await ecoshareApi.post("/auth/register", newUser);
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await ecoshareApi.get(`/users/${id}`, getAuthHeaders());
    return response.data;
  },

  refreshToken: async (token: string): Promise<{ accessToken: string }> => {
    const response = await ecoshareApi.post("/auth/refresh", {
      refreshToken: token,
    });
    return response.data;
  },

  update: async (id: string, user: UserUpdate): Promise<User> => {
    const response = await ecoshareApi.put(
      `/users/${id}`,
      user,
      getAuthHeaders()
    );
    return response.data;
  },

  changePassword: async (
    id: string,
    passwords: PasswordChange
  ): Promise<void> => {
    await ecoshareApi.patch(
      `/users/${id}/password`,
      passwords,
      getAuthHeaders()
    );
  },

  delete: async (id: string): Promise<void> => {
    await ecoshareApi.delete(`/users/${id}`, getAuthHeaders());
  },
};
