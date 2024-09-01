"use client";

import { deleteAction } from "@/actions/Task";
import { TaskDTO } from "@/dtos/Task";
import { useActionStateCompat } from "@/hooks/useActionStateCompat";

type Props = {
  tasks: TaskDTO[];
};

function TaskRow({ task }: { task: TaskDTO }) {
  const [state, submitAction, isPending] = useActionStateCompat(deleteAction, {
    error: false,
    message: null,
  });
  return (
    <li className="py-3 px-4 border border-gray-300 rounded-md">
      id: {task.id}
      <br />
      name: {task.name}
      <br />
      date: {task.dueDate.toDateString()}
      <br />
      userId: {task.userId}
      <br />
      <br />
      <form action={submitAction}>
        <input type="hidden" name="taskId" value={task.id} />
        <button
          className="rounded-md bg-black text-white py-2 px-3 transition-colors hover:bg-gray-800 disabled:opacity-50"
          disabled={isPending}
        >
          delete
        </button>
      </form>
    </li>
  );
}

export function TaskList({ tasks }: Props) {
  return (
    <ul className="grid gap-2">
      {tasks.map((task) => (
        <TaskRow task={task} key={task.id} />
      ))}
    </ul>
  );
}
