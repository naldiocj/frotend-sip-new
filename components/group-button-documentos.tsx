"use client";

import { cn } from "@/lib/utils";
import { BookOpen, Printer } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface iAppProps {
  id: number;
}

export function GroupButtonDocumentos({ id }: iAppProps) {
  const [currCard, setCurrCard] = useState<number | null>(1);
  const [isShowDocument, setCurrentDocument] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "flex justify-center items-center w-full gap-2 opacity-0 transition-opacity duration-800 mt-3",
        currCard === id ? "opacity-100" : "opacity-0",
      )}
    >
      <Button
        variant={"outline"}
        className="cursor-pointer hover:bg-black hover:text-white dark:bg-foreground dark:text-black dark:hover:bg-foreground"
        onClick={() => setCurrentDocument(true)}
      >
        <BookOpen />
      </Button>
      <Button className="cursor-pointer hover:bg-blue-900">
        <Printer />
      </Button>
    </div>
  );
}
