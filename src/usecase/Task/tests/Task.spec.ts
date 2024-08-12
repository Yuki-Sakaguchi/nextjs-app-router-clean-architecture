import { describe, expect, it } from "vitest";
import { TaskUseCase } from "../Task";

describe("TaskUseCase", () => {
  describe("constructor", () => {
    it("インスタンスの生成に成功する", () => {
      const actual = new TaskUseCase();
      expect(actual).toBeInstanceOf(TaskUseCase);
    });
  });

  describe.skip("create", () => {
    // TODO
  });

  describe.skip("getAll", () => {
    // TODO
  });
});
