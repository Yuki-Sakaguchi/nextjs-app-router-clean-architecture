import { TaskList } from "@/components/TaskList";
import { TaskUseCase } from "@/usecase";

export default async function Home() {
  const tasks = await new TaskUseCase().getAll();
  return (
    <div className="m-4">
      <TaskList tasks={tasks} />
    </div>
  );
}
