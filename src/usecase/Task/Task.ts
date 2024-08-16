import {
  type ITaskRepository,
  Task,
  TaskId,
  TaskName,
  UserId,
} from "@/domain/models";
import { container } from "@/di/inversify.config";
import { TYPES } from "@/di/types";

/**
 * タスクを生成する
 */
export class TaskUseCase {
  private taskRepository: ITaskRepository;

  constructor() {
    this.taskRepository = container.get<ITaskRepository>(TYPES.ITaskRepository);
  }

  create(taskName: string, userId: UserId, dueDate: Date): TaskId {
    const task = Task.create(new TaskName(taskName), userId, dueDate);
    this.taskRepository.insert(task);
    return task.id;
  }

  getAll(): Task[] {
    return this.taskRepository.getAll();
  }
}
