import { TIPO_PROCESSO } from "@/lib/dto/processo.dto";
import { Badge } from "../ui/badge";

interface iAppProps {
  tipoProcesso: string | null;
}

export default function BadgeTipoProcesso({ tipoProcesso }: iAppProps) {
  return (
    <div className="w-32">
      {tipoProcesso === TIPO_PROCESSO.NORMAL && (
        <Badge
          variant="default"
          className="px-1.5 bg-green-100 text-green-800 border border-green-300"
        >
          NORMAL
        </Badge>
      )}
      {tipoProcesso === TIPO_PROCESSO.AVERIGUACAO && (
        <Badge
          variant="default"
          className="px-1.5 bg-yellow-100 text-yellow-800 border border-yellow-300"
        >
          AVERIGUAÇÃO
        </Badge>
      )}
      {tipoProcesso === TIPO_PROCESSO.COM_DETIDO && (
        <Badge
          variant="default"
          className="px-1.5 bg-red-100 text-red-800 border border-red-300"
        >
          COM DETIDO
        </Badge>
      )}
    </div>
  );
}
