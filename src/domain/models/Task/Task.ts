import { v4 as uuidv4 } from "uuid";

import { UserId } from "../User";

/**
 * タスク
 */
export class Task {
  constructor(
    public id: TaskId,
    public name: TaskName,
    public userId: UserId,
    public dueDate: Date
  ) {}

  /**
   * タスクを生成する
   */
  static create(name: TaskName, userId: UserId, dueDate: Date): Task {
    const id = new TaskId();
    return new Task(id, name, userId, dueDate);
  }
}

/**
 * タスクID
 */
export class TaskId {
  public value = uuidv4();
}

/**
 * タスク名
 */
export class TaskName {
  constructor(public value: string) {
    if (value.length === 0 || value.length > 30) {
      throw new Error("タスク名は1〜30文字で指定してください");
    }
  }
}

/**
 * リポジトリのインターフェース
 */
export interface ITaskRepository {
  getAll(): Task[];
  findById(taskId: TaskId): Task;
  insert(task: Task): void;
  update(task: Task): void;
}
