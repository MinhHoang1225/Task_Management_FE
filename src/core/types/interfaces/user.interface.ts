import type { UserRole } from '../constants/enum';

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
}

export interface UpdateUserPayload {
  email?: string;
  username?: string;
  fullName?: string;
  password?: string;
}

export interface UserSummary {
  id: string;
  username: string;
}