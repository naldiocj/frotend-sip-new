import { DiligenciasTimeLine } from "@/components/patterns/diligencias-timeline";
import { Button } from "@/components/ui/button";
import { CirclePlus, Upload } from "lucide-react";

export default function Page() {
  return (
    <>
      <header className="flex justify-end gap-4">
        <Button>
          <CirclePlus />
          Registar
        </Button>
        <Button className="bg-green-600 hover:bg-green-600">
          <Upload />
          Carregar
        </Button>
      </header>
      <DiligenciasTimeLine />
    </>
  );
}
