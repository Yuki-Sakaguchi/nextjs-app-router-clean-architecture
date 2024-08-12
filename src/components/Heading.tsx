import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Heading({ children }: Props) {
  return <h1>{children}</h1>;
}
