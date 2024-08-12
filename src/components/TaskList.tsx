import { Task } from "@/domain";

type Props = {
  tasks: Task[];
};

export function TaskList({ tasks }: Props) {
  return (
    <ul className="grid gap-2">
      {tasks.map((task) => (
        <li
          key={task.id.val}
          className="py-3 px-4 border border-gray-300 rounded-md"
        >
          id: {task.id.val}
          <br />
          name: {task.name.val}
          <br />
          date: {task.dueDate.toDateString()}
          <br />
          userId: {task.userId.val}
        </li>
      ))}
    </ul>
  );
}
