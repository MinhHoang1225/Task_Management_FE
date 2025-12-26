import axiosInstance from '../config/axios';
import { API_URL } from '../types/constants';
import type { Task, TaskPayload } from '../types/interfaces/task.interface';

export const getTasksApi = () => {
  return axiosInstance.get<Task[]>(API_URL.TASKS);
};


export const createTaskApi = (payload: TaskPayload) => {
  return axiosInstance.post<{ data: Task }>(API_URL.TASKS, payload);
};

export const updateTaskStatusApi = (id: string, payload: { status: Task['status'] }) =>
  axiosInstance.patch(`${API_URL.TASKS}/${id}/status`, { status: payload.status });
