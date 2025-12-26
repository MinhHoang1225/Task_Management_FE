import type { TaskStatus } from '../constants/enum';

export interface TaskPayload {
  content?: string;
  status?: TaskStatus;
}

export interface UserSummary {
  id: string;
  username: string;
}

export interface UserSummary {
  id: string;
  username: string;
}

export interface Task {
  id: string;
  content: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: UserSummary;
}
