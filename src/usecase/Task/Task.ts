import {
  type ITaskRepository,
  Task,
  TaskId,
  TaskName,
  UserId,
} from "@/domain/models";
import { TYPES } from "@/di/types";
import { container } from "@/di/config";

/**
 * タスクを生成する
 */
export class TaskUseCase {
  private taskRepository: ITaskRepository = container.resolve(
    TYPES.ITaskRepository
  );

  create(taskName: string): TaskId {
    const task = Task.create(new TaskName(taskName), new UserId(), new Date());
    this.taskRepository.insert(task);
    return task.id;
  }

  getAll(): Task[] {
    return this.taskRepository.getAll();
  }
}
