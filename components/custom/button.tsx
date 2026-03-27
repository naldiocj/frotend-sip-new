import { ReactNode } from "react";
import { Button as UiButton } from "../ui/button";

export default function Button({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  return (
    <UiButton
      variant="secondary"
      className={`bg-${color}-950 text-white hover:bg-${color}-950 hover:text-white`}
    >
      {children}
    </UiButton>
  );
}
