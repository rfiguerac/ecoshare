import { userRepositoryImpl } from "../data/UserRepository.impl";

import type {
  User,
  UserCredential,
  NewUser,
  UserUpdate,
  PasswordChange,
} from "../domain/interfaces/User";
import type { UserRepository } from "../domain/repositories/UserRepository";

export const userService = (
  repository: UserRepository = userRepositoryImpl
) => {
  const login = async (credentials: UserCredential) => {
    return await repository.login(credentials);
  };

  const register = async (newUser: NewUser) => {
    return await repository.register(newUser);
  };

  const getProfile = async (id: string) => {
    return await repository.getById(id);
  };

  const updateProfile = async (id: string, userData: UserUpdate) => {
    return await repository.update(id, userData);
  };

  const changePassword = async (id: string, passwords: PasswordChange) => {
    return await repository.changePassword(id, passwords);
  };

  const deleteAccount = async (id: string) => {
    return await repository.delete(id);
  };

  const refreshToken = async (token: string) => {
    return await repository.refreshToken(token);
  };

  const getAllProfiles = async () => {
    return await repository.getAll();
  };

  return {
    login,
    register,
    getProfile,
    updateProfile,
    changePassword,
    deleteAccount,
    refreshToken,
    getAllProfiles,
  };
};
