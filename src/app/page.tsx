import { TaskUseCase } from "@/usecase";
import { TaskList } from "@/components/TaskList";
import { submit } from "./action";

export default async function Home() {
  const tasks = await new TaskUseCase().getAll();
  return (
    <main className="m-4">
      <form action={submit}>
        <div>
          <input
            type="text"
            name="taskName"
            placeholder="task name"
            className="border border-gray-200 rounded-md py-2 px-3"
          />
        </div>
        <div className="mt-2">
          <button className="rounded-md bg-black text-white py-2 px-3 transition-colors hover:bg-gray-800">
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
