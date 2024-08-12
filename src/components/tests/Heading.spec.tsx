import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Heading } from "../Heading";

describe("TaskListコンポーネント", () => {
  const title = "タイトル";

  it("タイトルを描画する", async () => {
    render(<Heading>{title}</Heading>);
    const view = await screen.findByText(title);
    expect(view.innerHTML).toBe(title);
    expect(view.nodeName).toBe("H1");
  });

  /**
   * テストごとにHTMLを生成する
   * 生成されているものと違う場合はテストが落ちるようになる
   * 新しく生成するときはエラーが出た後のコマンド上で `u` を押すと再生成されてそれが正となる
   */
  // it("スナップショット", () => {
  //   const wrapper = render(Heading, { props: { element: "div" } });
  //   expect(wrapper).matchSnapshot();
  // });
});
