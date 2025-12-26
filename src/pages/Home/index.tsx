import React, { useState } from 'react';
import {
  useTasks,
  useCreateTask,
  useUpdateTaskStatus,
} from '@app/core/hooks/useTask';
import type { Task } from '@app/core/types/interfaces/task.interface';

const TASK_STATUSES: Task['status'][] = ['TODO', 'IN_PROGRESS', 'DONE'];

const statusStyleMap: Record<Task['status'], string> = {
  TODO: 'bg-gray-100 text-gray-700 ring-1 ring-gray-200',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 ring-1 ring-blue-200',
  DONE: 'bg-green-100 text-green-700 ring-1 ring-green-200',
};

const Home: React.FC = () => {
  const { data: tasks = [], isLoading, isError } = useTasks();
  const { mutateAsync: createTask, isPending } = useCreateTask();
  const { mutateAsync: updateTaskStatus } = useUpdateTaskStatus();

  const [content, setContent] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleCreateTask = async () => {
    if (!content.trim()) return;
    await createTask({ content });
    setContent('');
  };

  const handleUpdateStatus = async (
    id: string,
    status: Task['status'],
  ) => {
    setUpdatingId(id);
    await updateTaskStatus({ id, status });
    setUpdatingId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        Loading tasks...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen grid place-items-center text-red-500">
        Failed to load tasks
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          📝 My Tasks
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your daily work efficiently
        </p>
      </div>

      {/* Create Task */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex gap-3 max-w-xl">
          <input
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="What needs to be done?"
            className="
              flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm
              shadow-sm placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            "
          />

          <button
            onClick={handleCreateTask}
            disabled={isPending}
            className="
              rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white
              shadow-sm hover:bg-blue-700 active:scale-[0.98]
              transition disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isPending ? 'Adding…' : 'Add'}
          </button>
        </div>
      </div>

      {/* Empty */}
      {tasks.length === 0 && (
        <p className="text-center text-gray-500">
          No tasks yet. Add your first one ✨
        </p>
      )}

      {/* Task List */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className="
              group rounded-2xl bg-white p-5
              border border-gray-200
              shadow-sm hover:shadow-lg hover:-translate-y-0.5
              transition-all
            "
          >
            {/* Title + Badge */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="font-semibold text-gray-800 leading-snug">
                {task.content}
              </h3>

              <span
                className={`
                  px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap
                  ${statusStyleMap[task.status]}
                `}
              >
                {task.status.replace('_', ' ')}
              </span>
            </div>

            {/* User */}
            <p className="text-sm text-gray-500 mb-5">
              👤 {task.user?.username ?? 'Unknown'}
            </p>

            {/* Status Select */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Status
              </label>

              <select
                value={task.status}
                onChange={e =>
                  handleUpdateStatus(
                    task.id,
                    e.target.value as Task['status'],
                  )
                }
                disabled={updatingId === task.id}
                className="
                  w-full rounded-lg border border-gray-300 bg-white
                  px-3 py-2 text-sm text-gray-700
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {TASK_STATUSES.map(status => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
