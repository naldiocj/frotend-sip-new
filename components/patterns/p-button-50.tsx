import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

export function GobackButton() {
  return (
    <Button variant="link" className="group/back-button" asChild>
      <Link href="">
        <ChevronLeftIcon
          data-icon="inline-start"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover/back-button:-translate-x-1"
        />
        Voltar
      </Link>
    </Button>
  );
}
