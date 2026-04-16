import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token from cookie on every request (client-side only)
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Server‑side helper that creates a pre‑authenticated axios instance.
 * Use it when you have the access token (e.g. from the request cookie)
 * and need to make API calls from a server‑side context.
 */
export const apiWithToken = (token: string | null, otherHeaders = {}) => {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...otherHeaders,
    },
  });

  return {
    get: <T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
      client.get<T>(endpoint, config).then((res) => res.data),

    post: <T = any>(
      endpoint: string,
      body: unknown,
      config?: AxiosRequestConfig,
    ): Promise<T> =>
      client.post<T>(endpoint, body, config).then((res) => res.data),

    put: <T = any>(
      endpoint: string,
      body: unknown,
      config?: AxiosRequestConfig,
    ): Promise<T> =>
      client.put<T>(endpoint, body, config).then((res) => res.data),

    patch: <T = any>(
      endpoint: string,
      body: unknown,
      config?: AxiosRequestConfig,
    ): Promise<T> =>
      client.patch<T>(endpoint, body, config).then((res) => res.data),

    delete: <T = any>(
      endpoint: string,
      config?: AxiosRequestConfig,
    ): Promise<T> => client.delete<T>(endpoint, config).then((res) => res.data),
  };
};

export const api = {
  get: <T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.get<T>(endpoint, config).then((res) => res.data),

  post: <T = any>(
    endpoint: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> =>
    axiosInstance.post<T>(endpoint, body, config).then((res) => res.data),

  put: <T = any>(
    endpoint: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> =>
    axiosInstance.put<T>(endpoint, body, config).then((res) => res.data),

  delete: <T = any>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<T> =>
    axiosInstance.delete<T>(endpoint, config).then((res) => res.data),
};

export default api;
