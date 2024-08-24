"use client";

import { Task } from "@/domain/models";
import { TaskList } from "@/components/TaskList";
import { createTask } from "./actions";
import { useActionStateCompat } from "@/hooks/useActionStateCompat";

export function Client({ tasks }: { tasks: Task[] }) {
  const [state, submitAction, isPending] = useActionStateCompat(createTask, {
    error: false,
    message: null,
  });
  return (
    <main className="m-4">
      <form action={submitAction}>
        <div>
          <input
            type="text"
            name="taskName"
            placeholder="task name"
            className="border border-gray-200 rounded-md py-2 px-3"
            disabled={isPending}
          />
          {state?.error && (
            <span className="text-red-700 ml-4">{state.message}</span>
          )}
        </div>
        <div className="mt-2">
          <button
            className="rounded-md bg-black text-white py-2 px-3 transition-colors hover:bg-gray-800"
            disabled={isPending}
          >
            create task
          </button>
        </div>
      </form>
      <hr className="mt-4" />
      <div className="mt-4">
        {tasks.length === 0 ? (
          <p>タスクがありません</p>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </div>
    </main>
  );
}
