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

  async create(taskName: string): Promise<TaskId> {
    const task = Task.create({
      name: new TaskName(taskName),
      userId: new UserId(),
      dueDate: new Date(),
    });
    await this.taskRepository.insert(task);
    return task.id;
  }

  async delete(id: string): Promise<TaskId> {
    const taskId = new TaskId(id);
    await this.taskRepository.delete(taskId);
    return taskId;
  }

  async getAll(): Promise<TaskDTO[]> {
    const tasks = await this.taskRepository.getAll();
    return tasks.map((task) => TaskDTOFactory.toDTO(task));
  }
}

export class TaskGetAllInput {
  // input data
}

export class TaskGetAllOutput {
  // output data
}

export type TaskDTO = {
  id: string;
  name: string;
  userId: string;
  dueDate: Date;
};

// DTO
export class TaskDTOFactory {
  static toDTO(task: Task): TaskDTO {
    return {
      id: task.id.value,
      name: task.name.value,
      userId: task.userId.value,
      dueDate: task.dueDate,
    };
  }
}
