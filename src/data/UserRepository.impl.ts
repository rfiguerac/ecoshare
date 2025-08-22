import { ecoshareApi } from "../api/ecoshareApi";

import type {
  User,
  UserCredential,
  NewUser,
  UserUpdate,
  PasswordChange,
} from "../domain/interfaces/User";
import type { UserRepository } from "../domain/repositories/userRepository";

export const userRepositoryImpl: UserRepository = {
  login: async (credentials: UserCredential): Promise<User> => {
    const response = await ecoshareApi.post("/users/login", credentials);
    return response.data;
  },

  register: async (newUser: NewUser): Promise<User> => {
    const response = await ecoshareApi.post("/users/register", newUser);
    return response.data;
  },

  getById: async (): Promise<User> => {
    const response = await ecoshareApi.get("/users/profile");
    console.log("User profile:", response.data);
    return response.data;
  },

  refreshToken: async (token: string): Promise<{ accessToken: string }> => {
    const response = await ecoshareApi.post("/users/refresh", {
      refreshToken: token,
    });
    return response.data;
  },

  update: async (id: string, user: UserUpdate): Promise<User> => {
    const response = await ecoshareApi.put(`/users/${id}`, user);
    return response.data;
  },

  changePassword: async (
    id: string,
    passwords: PasswordChange
  ): Promise<void> => {
    await ecoshareApi.patch(`/users/${id}/password`, passwords);
  },

  delete: async (id: string): Promise<void> => {
    await ecoshareApi.delete(`/users/${id}`);
  },
};
