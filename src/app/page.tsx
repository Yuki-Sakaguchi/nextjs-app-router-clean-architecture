import { TaskUseCase } from "@/usecase";
import { Client } from "./client";

export default async function Home() {
  const tasks = await new TaskUseCase().getAll();
  return <Client tasks={tasks} />;
}
