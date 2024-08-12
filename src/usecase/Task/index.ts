import { Task, TaskId, TaskName, UserId } from "@/domain";
import { TaskInMemoryRepository } from "@/infrastructure/repository";

/**
 * タスクを生成する
 */
export class TaskUseCase {
  private taskRepository = new TaskInMemoryRepository(); // DIで差し替えたい

  create(taskName: string, userId: UserId, dueDate: Date): TaskId {
    const task = Task.create(new TaskName(taskName), userId, dueDate);
    this.taskRepository.insert(task);
    return task.id;
  }

  getAll(): Task[] {
    return this.taskRepository.getAll();
  }
}
