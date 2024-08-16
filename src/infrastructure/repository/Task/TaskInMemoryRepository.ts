import { injectable } from "inversify";
import {
  Task,
  ITaskRepository,
  TaskId,
  TaskName,
  UserId,
} from "@/domain/models";

/**
 * タスクリポジトリ
 * インメモリで実装するもの
 */
@injectable()
export class TaskInMemoryRepository implements ITaskRepository {
  getAll() {
    console.log("TaskInMemoryRepository getAll");
    // TODO: 実際はDBから取得したタスクを返す
    const taskRaw = {
      taskName: "new task name",
      userId: new UserId(),
      dueDate: new Date(),
    };
    const task = Task.create(
      new TaskName(taskRaw.taskName),
      taskRaw.userId,
      taskRaw.dueDate
    );
    return [task];
  }

  findById(taskId: TaskId): Task {
    // TODO: 実際はDBから取得したタスクを返す
    console.log("TaskInMemoryRepository findById");
    const taskRaw = {
      taskName: "new task name",
      userId: new UserId(),
      dueDate: new Date(),
    };
    const task = Task.create(
      new TaskName(taskRaw.taskName),
      taskRaw.userId,
      taskRaw.dueDate
    );
    return task;
  }

  insert(task: Task): void {
    // TODO: 実際はDBにTaskを追加する
    console.log("TaskInMemoryRepository insert");
    console.log("taskをインサートしました");
  }

  update(task: Task): void {
    // TODO: 実際はDBのTaskを更新する
    console.log("TaskInMemoryRepository update");
    console.log("taskをアップデートしました");
  }
}
