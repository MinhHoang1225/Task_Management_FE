import axiosInstance from '@app/core/config/axios';
import { API_URL } from '@app/core/types/constants';
import type { RegisterPayload, LoginPayload, User } from '@app/core/types/interfaces';

export const getProfileApi = () => axiosInstance.get<{ data: User }>(API_URL.PROFILE);

export const loginApi = (payload: LoginPayload) =>
  axiosInstance.post(API_URL.LOGIN, payload);

export const registerApi = (payload: RegisterPayload) =>
  axiosInstance.post(API_URL.REGISTER, payload);