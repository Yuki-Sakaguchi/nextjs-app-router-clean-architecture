"use server";

import { TaskUseCase } from "@/usecase";
import { redirect } from "next/navigation";

export async function submit(formData: FormData) {
  const taskName = formData.get("taskName") as string;
  if (taskName == null) return;
  new TaskUseCase().create(taskName);
  redirect("/");
}
