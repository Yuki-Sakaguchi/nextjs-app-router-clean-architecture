import { describe, expect, it } from "vitest";
import { TaskName } from "../Task";

describe("TaskName", () => {
  describe("constructor", () => {
    it("TaskNameインスタンスの生成に成功する", () => {
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
