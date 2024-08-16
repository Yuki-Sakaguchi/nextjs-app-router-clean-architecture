import { Container } from "inversify";
import { TYPES } from "./types";
import { ITaskRepository } from "../domain/models";
import {
  TaskInMemoryRepository,
  TaskRdbRepository,
} from "../infrastructure/repository";

const container = new Container();

if (process.env.NODE_ENV === "production") {
  container.bind<ITaskRepository>(TYPES.ITaskRepository).to(TaskRdbRepository);
} else {
  container
    .bind<ITaskRepository>(TYPES.ITaskRepository)
    .to(TaskInMemoryRepository);
}

export { container };
