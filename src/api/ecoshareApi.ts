import axios from "axios";
import { useAuthStore } from "../store/AuthStore";

export const ecoshareApi = axios.create({
  baseURL: "http://localhost:3002/api/v1",
});

ecoshareApi.interceptors.request.use(
  (config) => {
    // Obtiene el token directamente de localStorage, evitando el store de Zustand en este contexto
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ecoshareApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Si el error es 401 y no es un reintento
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshAuthToken, logout } = useAuthStore.getState();
      try {
        await refreshAuthToken();
        const { accessToken } = useAuthStore.getState();
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return ecoshareApi(originalRequest);
      } catch (refreshError) {
        // Si el refresh falla, redirigimos al login
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
