import "reflect-metadata";
import { container } from "tsyringe";
import { TYPES } from "./types";
import {
  TaskInMemoryRepository,
  TaskRdbRepository,
} from "../infrastructure/repository";

if (process.env.NODE_ENV === "production") {
  container.register(TYPES.ITaskRepository, {
    useClass: TaskRdbRepository,
  });
} else {
  container.register(TYPES.ITaskRepository, {
    useClass: TaskInMemoryRepository,
  });
}

export { container };
