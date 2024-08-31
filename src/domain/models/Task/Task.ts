import { UuidFactory } from "@/utils/uuid";
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
  static create({
    id,
    name,
    userId,
    dueDate,
  }: {
    id?: TaskId;
    name: TaskName;
    userId: UserId;
    dueDate: Date;
  }): Task {
    return new Task(id ?? new TaskId(), name, userId, dueDate);
  }
}

/**
 * タスクID
 */
export class TaskId {
  constructor(public value = UuidFactory.generate()) {
    if (!UuidFactory.validate(value)) {
      throw new Error("IDの形式が正しくありません");
    }
  }
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
  getAll(): Promise<Task[]>;
  findById(taskId: TaskId): Task | undefined;
  insert(task: Task): Promise<void>;
  update(options: { taskId: TaskId; taskName: string; userId: UserId }): void;
  delete(taskId: TaskId): Promise<void>;
}
