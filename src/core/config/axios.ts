import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

import { getStorageData, removeStorageData } from "@app/core/config/storage";
import {
  ACCESS_TOKEN,
  API_URL,
  CLIENT_TYPE,
  USER_PROFILE,
} from "@app/core/types/constants";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

console.log('AXIOS BASE URL >>>', import.meta.env.VITE_BASE_URL_API);
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url === API_URL.LOGIN) {
      config.headers["X-Client-Type"] = CLIENT_TYPE;
      return config;
    }

    const accessToken = getStorageData(ACCESS_TOKEN);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: unknown) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    const { response } = error as { response?: { status: number } };

    if (response?.status === 401) {
      clearAuthStorage();
    }

    return Promise.reject(error);
  }
);

function clearAuthStorage() {
  removeStorageData(USER_PROFILE);
  removeStorageData(ACCESS_TOKEN);
}

export default axiosInstance;
