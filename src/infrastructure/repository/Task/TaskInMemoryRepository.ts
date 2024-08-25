import { injectable } from "tsyringe";
import {
  Task,
  ITaskRepository,
  TaskId,
  TaskName,
  UserId,
} from "@/domain/models";
// import { inMemory } from "@/infrastructure/adapter/db/InMemoryDB";
// import { prisma } from "@/infrastructure/adapter/db/prisma";
import { createClient } from "@/lib/supabase/server";

/**
 * タスクリポジトリ
 * インメモリで実装するもの
 */
@injectable()
export class TaskInMemoryRepository implements ITaskRepository {
  async getAll() {
    console.log("TaskInMemoryRepository getAll");
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("Task")
        .select("*")
        .order("created_at");
      if (error) {
        throw new Error("タスクの取得に失敗しました");
      }
      const tasks = data?.map((value) => {
        return Task.create({
          id: new TaskId(value.id),
          name: new TaskName(value.title),
          userId: new UserId(value.user_id),
          dueDate: new Date(value.created_at),
        });
      });
      if (tasks) {
        return tasks;
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) throw new Error(e.message);
    }
    return [];
  }

  findById(taskId: TaskId) {
    return undefined;
    // const task = inMemory.tasks.find((task) => task.id === taskId);
    // console.log("TaskInMemoryRepository findById", task);
    // return task;
  }

  async insert(task: Task) {
    console.log("TaskInMemoryRepository insert");
    // inMemory.tasks.push(task);
    // console.log("taskをインサートしました", inMemory.tasks);
    // const supabase = createClient();
    // const { data, error } = await supabase.auth.getUser();
    // await prisma.task.create({
    //   data: {
    //     title: task.name.value,
    //     content: task.name.value,
    //     users: {},
    //   },
    // });
    const supabase = createClient();
    try {
      const { error } = await supabase.from("Task").insert({
        title: task.name.value,
        content: task.name.value,
        user_id: "b678ffbc-c78f-44d4-bd3d-870b4e5b026f", // task.userId.value, // FIXME一旦、自分のユーザーに固定している
        is_completed: false,
      });
      if (error) {
        throw new Error("タスクの追加に失敗しました");
      } else {
        console.log("タスクの追加に成功しました");
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) throw new Error(e.message);
    }
  }

  update({
    taskId,
    taskName,
    userId,
  }: {
    taskId: TaskId;
    taskName: string;
    userId: UserId;
  }): void {
    console.log("TaskInMemoryRepository update");
    console.log("taskをアップデートしました");
    // const task = inMemory.tasks.find((task) => task.id === taskId);
    // if (task == null) return;
    // task.name = new TaskName(taskName);
  }
}
