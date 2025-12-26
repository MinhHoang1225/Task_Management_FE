import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Task,TaskPayload } from '../types/interfaces/task.interface';
import {  getTasksApi, createTaskApi, updateTaskStatusApi  } from '../services/taskAPI';

export const useTasks = () => {
  console.log('[HOOK] useTasks mounted');

  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await getTasksApi();
      return response.data;
    },
  });
};




export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: TaskPayload) => {
      const response = await createTaskApi(payload);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};


export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Task['status'] }) => {
      const response = await updateTaskStatusApi(id, { status });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });
}