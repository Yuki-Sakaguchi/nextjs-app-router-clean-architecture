import { injectable } from "tsyringe";
import {
  Task,
  ITaskRepository,
  TaskId,
  TaskName,
  UserId,
} from "@/domain/models";
import { inMemory } from "@/infrastructure/adapter/db/InMemoryDB";

/**
 * タスクリポジトリ
 * インメモリで実装するもの
 */
@injectable()
export class TaskInMemoryRepository implements ITaskRepository {
  getAll() {
    console.log("TaskInMemoryRepository getAll");
    return inMemory.tasks;
  }

  findById(taskId: TaskId): Task | undefined {
    console.log("TaskInMemoryRepository findById");
    return inMemory.tasks.find((task) => task.id === taskId);
  }

  insert(task: Task): void {
    console.log("TaskInMemoryRepository insert");
    console.log("taskをインサートしました");
    inMemory.tasks.push(task);
  }

  update({
    taskId,
    taskName,
    userId,
  }: {
    taskId: TaskId;
    taskName: string;
    userId: UserId;
  }): void {
    console.log("TaskInMemoryRepository update");
    console.log("taskをアップデートしました");
    const task = inMemory.tasks.find((task) => task.id === taskId);
    if (task == null) return;
    task.name = new TaskName(taskName);
  }
}
