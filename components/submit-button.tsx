import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface iAppProps {
  isPending: boolean;
}

export function SubmitButton({ isPending }: iAppProps) {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Registando...
        </>
      ) : (
        <span>Registar</span>
      )}
    </Button>
  );
}
