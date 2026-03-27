import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ReactNode } from "react";

export function CircleButton({ children }: { children: ReactNode }) {
  return (
    <Button className="group/fab relative flex h-10 w-10 items-center overflow-hidden rounded-full px-3 transition-[width] duration-300 ease-in-out hover:w-32">
      {children}
    </Button>
  );
}
