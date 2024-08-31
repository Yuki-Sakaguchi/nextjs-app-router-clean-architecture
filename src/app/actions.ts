"use server";

import { TaskUseCase } from "@/usecase";
import { revalidatePath } from "next/cache";

type FromState = {
  error: boolean;
  message: string | null;
};

export async function createTask(
  _state: FromState | null,
  formData: FormData
): Promise<FromState> {
  const taskName = formData.get("taskName") as string;
  try {
    new TaskUseCase().create(taskName);
  } catch (e) {
    if (e instanceof Error) {
      return { error: true, message: e.message };
    }
  }
  console.log("task を追加しました");
  revalidatePath("/");
  return { error: false, message: "タスクを追加しました" };
}

export async function deleteAction(taskId: string) {
  try {
    await new TaskUseCase().delete(taskId);
  } catch (e) {
    if (e instanceof Error) {
      return { error: true, message: e.message };
    }
  }
  console.log("task を削除しました");
  revalidatePath("/");
  return { error: false, message: "タスクを削除しました" };
}
