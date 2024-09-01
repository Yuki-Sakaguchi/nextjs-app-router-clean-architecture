import { UserId } from "@/domain/models";
import { Task, TaskName } from "@/domain/models/Task";

export type TaskDTO = {
  id: string;
  name: string;
  userId: string;
  dueDate: Date;
};

export class TaskMapper {
  static toDTO(task: Task): TaskDTO {
    return {
      id: task.id.value,
      name: task.name.value,
      userId: task.userId.value,
      dueDate: task.dueDate,
    };
  }

  static toDomain(dto: TaskDTO): Task {
    return Task.create({
      name: new TaskName(dto.name),
      userId: new UserId(),
      dueDate: new Date(),
    });
  }
}
