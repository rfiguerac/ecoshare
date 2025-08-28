import { create } from "zustand";
import { userService } from "../services/userService";
import type {
  User,
  UserCredential,
  NewUser,
  UserUpdate,
  PasswordChange,
} from "../domain/interfaces/User";

interface AuthState {
  user: User | null;
  allProfiles: User[] | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (credentials: UserCredential) => Promise<void>;
  register: (newUser: NewUser) => Promise<void>;
  logout: () => void;
  updateProfile: (userUpdate: UserUpdate) => Promise<User | undefined>;
  changePassword: (passwords: PasswordChange) => Promise<User | void>;
  deleteAccount: () => Promise<void>;
  refreshAuthToken: () => Promise<void>;
  checkAuth: () => Promise<void>;
  fetchAllProfiles: () => Promise<void>;
}

const service = userService();

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  allProfiles: [],
  isAuthenticated: false,
  loading: true,
  error: null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const loggedInUser = await service.login(credentials);
      localStorage.setItem("accessToken", loggedInUser.accessToken!);
      localStorage.setItem("refreshToken", loggedInUser.refreshToken!);

      set({
        user: loggedInUser,
        isAuthenticated: true,
        loading: false,
        accessToken: loggedInUser.accessToken!,
        refreshToken: loggedInUser.refreshToken!,
      });
    } catch (err: any) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: "Login failed. Check your credentials.",
        accessToken: null,
        refreshToken: null,
      });
    }
  },

  register: async (newUser) => {
    set({ loading: true, error: null });
    try {
      const registeredUser = await service.register(newUser);
      localStorage.setItem("accessToken", registeredUser.accessToken!);
      localStorage.setItem("refreshToken", registeredUser.refreshToken!);
      set({
        user: registeredUser,
        isAuthenticated: true,
        loading: false,
        accessToken: registeredUser.accessToken!,
        refreshToken: registeredUser.refreshToken!,
      });
    } catch (err: any) {
      // Captura el mensaje de error específico del backend

      const errorMessage =
        err.response.data.message || "Registration failed. Please try again.";
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: errorMessage,
        accessToken: null,
        refreshToken: null,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({
      user: null,
      isAuthenticated: false,
      error: null,
      accessToken: null,
      refreshToken: null,
    });
  },

  updateProfile: async (userUpdate) => {
    const { user } = get();
    if (!user) {
      set({ error: "User not authenticated." });
      return;
    }
    set({ loading: true, error: null });
    try {
      const updatedUser = await service.updateProfile(user.id, userUpdate);
      set({ user: updatedUser, loading: false });
      return updatedUser;
    } catch (err: any) {
      set({ loading: false, error: "Failed to update profile." });
    }
  },

  changePassword: async (passwords) => {
    const { user } = get();
    if (!user) {
      set({ error: "User not authenticated." });
      return;
    }
    set({ loading: true, error: null });
    try {
      await service.changePassword(user.id, passwords);
      set({ loading: false, error: null });
      alert("Password changed successfully!");
    } catch (err: any) {
      set({ loading: false, error: "Failed to change password." });
    }
  },

  deleteAccount: async () => {
    const { user, logout } = get();
    if (!user) {
      set({ error: "User not authenticated." });
      return;
    }
    set({ loading: true, error: null });
    try {
      await service.deleteAccount(user.id);
      logout(); // Log out after successful deletion
      alert("Account deleted successfully.");
    } catch (err: any) {
      set({ loading: false, error: "Failed to delete account." });
    }
  },

  refreshAuthToken: async () => {
    const { refreshToken } = get();
    if (!refreshToken) {
      set({ error: "No refresh token available." });
      return;
    }
    try {
      const response = await service.refreshToken(refreshToken);
      localStorage.setItem("accessToken", response.accessToken);
      set({ accessToken: response.accessToken });
    } catch (err: any) {
      set({ error: "Failed to refresh token." });
      get().logout();
      throw err;
    }
  },

  checkAuth: async () => {
    const accessToken = get().accessToken;
    const refreshToken = get().refreshToken;

    // Si no hay ningún token de acceso ni de refresco, no hay nada que hacer.
    if (!accessToken && !refreshToken) {
      set({ isAuthenticated: false, loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      const userProfile = await service.getProfile(accessToken!);
      set({
        user: userProfile,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err: any) {
      // En caso de que la validación inicial falle (token expirado, por ejemplo)
      // el interceptor de axios se encargará de intentar el refresh.
      // Si el interceptor falla, ya habrá hecho logout.
      // Por lo tanto, aquí simplemente establecemos el estado final.
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: err.message,
      });
    }
  },

  fetchAllProfiles: async () => {
    //set({ loading: true });
    try {
      const data = await service.getAllProfiles();
      console.log(data);
      set({
        allProfiles: data,
      });
    } catch (error) {
      console.error("Error fetching profiles:", error);
      // set({ loading: false });
    }
  },
}));
