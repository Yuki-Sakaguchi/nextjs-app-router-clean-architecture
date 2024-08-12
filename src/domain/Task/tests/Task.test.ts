import { describe, expect, it } from "vitest";
import { Task, TaskId, TaskName } from "../Task";
import { UserId } from "@/domain/User";
import { experimental_taintUniqueValue } from "react";

describe("Task", () => {
  describe("create", () => {
    it("タスクの作成に成功する", () => {
      const taskRaw = {
        id: new TaskId(),
        name: new TaskName("name"),
        userId: new UserId(),
        dueDate: new Date(),
      };
      const actual = new Task(
        taskRaw.id,
        taskRaw.name,
        taskRaw.userId,
        taskRaw.dueDate
      );
      expect(actual).toEqual(expect.objectContaining(taskRaw));
    });
  });
});

describe("TaskName", () => {
  describe("constructor", () => {
    it("インスタンスの生成に成功する", () => {
      const actual = new TaskName("name");
      expect(actual).toBeInstanceOf(TaskName);
      expect(actual.value).toBe("name");
    });

    it("0文字の場合は例外を投げる", () => {
      expect(() => {
        new TaskName("");
      }).toThrow("タスク名は1〜30文字で指定してください");
    });

    it("30文字以上場合は例外を投げる", () => {
      expect(() => {
        new TaskName(
          "ああああああああああああああああああああああああああああああい" // 31文字
        );
      }).toThrow("タスク名は1〜30文字で指定してください");
    });
  });
});
