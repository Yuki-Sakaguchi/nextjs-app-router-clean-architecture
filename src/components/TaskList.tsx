import { Task } from "@/domain";

type Props = {
  tasks: Task[];
};

export function TaskList({ tasks }: Props) {
  return (
    <ul className="grid gap-2">
      {tasks.map((task) => (
        <li
          key={task.id.value}
          className="py-3 px-4 border border-gray-300 rounded-md"
        >
          id: {task.id.value}
          <br />
          name: {task.name.value}
          <br />
          date: {task.dueDate.toDateString()}
          <br />
          userId: {task.userId.value}
        </li>
      ))}
    </ul>
  );
}
