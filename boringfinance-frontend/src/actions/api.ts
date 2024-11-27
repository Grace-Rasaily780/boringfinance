import axios from "axios";
import useUserStore from "@/store/useUserStore";
import { refreshAccessToken } from "@/actions/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const { accessToken } = useUserStore.getState();
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // console.log(error);
    if (error.response.status === 500) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = newAccessToken.accessToken;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
