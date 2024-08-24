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
    console.log("TaskInMemoryRepository getAll", inMemory.tasks);
    return inMemory.tasks;
  }

  findById(taskId: TaskId): Task | undefined {
    const task = inMemory.tasks.find((task) => task.id === taskId);
    console.log("TaskInMemoryRepository findById", task);
    return task;
  }

  insert(task: Task): void {
    console.log("TaskInMemoryRepository insert");
    inMemory.tasks.push(task);
    console.log("taskをインサートしました", inMemory.tasks);
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
