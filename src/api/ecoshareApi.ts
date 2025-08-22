import axios from "axios";

export const ecoshareApi = axios.create({
  baseURL: "http://localhost:3002/api/v1",
});

ecoshareApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
