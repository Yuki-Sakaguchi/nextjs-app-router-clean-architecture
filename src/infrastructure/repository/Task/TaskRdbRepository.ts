import { injectable } from "tsyringe";
import {
  Task,
  ITaskRepository,
  TaskId,
  TaskName,
  UserId,
} from "@/domain/models";

/**
 * タスクリポジトリ
 * RDBで実装するもの
 */
@injectable()
export class TaskRdbRepository implements ITaskRepository {
  getAll() {
    // TODO: 実際はDBから取得したタスクを返す
    console.log("TaskRdbRepository getAll");
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
    console.log("TaskRdbRepository findById");
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
    console.log("TaskRdbRepository insert");
    console.log("taskをインサートしました");
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
    // TODO: 実際はDBのTaskを更新する
    console.log("taskrdbrepository update");
    console.log("taskをアップデートしました");
  }
}
