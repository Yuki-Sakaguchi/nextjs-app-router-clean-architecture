import { TaskUseCase } from "@/usecase";
import { Client } from "./client";
import { TaskMapper } from "@/dtos/Task";

export default async function Home() {
  const tasks = await new TaskUseCase().getAll();
  const tasksDTO = tasks.map((task) => TaskMapper.toDTO(task));
  return <Client tasks={tasksDTO} />;
}
