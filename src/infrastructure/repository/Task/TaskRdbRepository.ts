import { Task, ITaskRepository, TaskId, TaskName, UserId } from "@/domain";

/**
 * タスクリポジトリ
 * RDBで実装するもの
 */
export class TaskRdbRepository implements ITaskRepository {
  getAll() {
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
    console.log("taskをインサートしました");
  }

  update(task: Task): void {
    // TODO: 実際はDBのTaskを更新する
    console.log("taskをアップデートしました");
  }
}
