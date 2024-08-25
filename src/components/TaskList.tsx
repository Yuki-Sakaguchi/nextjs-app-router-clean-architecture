import { Task } from "@/domain/models";
import { TaskDTO } from "@/usecase";

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
        </li>
      ))}
    </ul>
  );
}
