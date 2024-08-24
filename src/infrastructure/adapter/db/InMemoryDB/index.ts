import { Task } from "@/domain/models";

type InMemory = {
  tasks: Task[];
};

export const inMemory: InMemory = { tasks: [] };
