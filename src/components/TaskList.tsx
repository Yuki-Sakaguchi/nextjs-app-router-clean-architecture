import { deleteAction } from "@/actions/Task";
import { TaskDTO } from "@/dtos/Task";

type Props = {
  tasks: TaskDTO[];
};

export function TaskList({ tasks }: Props) {
  return (
    <ul className="grid gap-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="py-3 px-4 border border-gray-300 rounded-md"
        >
          id: {task.id}
          <br />
          name: {task.name}
          <br />
          date: {task.dueDate.toDateString()}
          <br />
          userId: {task.userId}
          <br />
          <br />
          <button
            className="rounded-md bg-black text-white py-2 px-3 transition-colors hover:bg-gray-800"
            onClick={() => deleteAction(task.id)}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
