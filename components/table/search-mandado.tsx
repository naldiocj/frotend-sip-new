"use client";

import { parsers } from "@/lib/searchparams";
import { SearchIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";
import { TIPOS_MANDADOS, ESTADOS_MANDADOS } from "@/app/services/mandado.constants";
import { TipoMandado } from "@/lib/dto/mandado.dto";

type EstadoValue = "PENDENTE" | "EM_EXECUCAO" | "CUMPRIDO" | "CANCELADO";

export default function SearchMandado() {
  const [query, setQuery] = useQueryStates(
    {
      q: parsers.q,
      tipo: { ...parsers.tipo, defaultValue: null },
      estado: { ...parsers.estado, defaultValue: null },
    },
    { shallow: false, throttleMs: 500, clearOnDefault: true },
  );

  return (
    <div className="flex flex-col gap-3">
      <ButtonGroup className="w-full">
        <Input
          value={query.q}
          placeholder="Pesquisar por processo, requerido..."
          onChange={(e) => setQuery({ q: e.target.value })}
        />
        <Button variant="outline" className="h-auto" aria-label="Pesquisar">
          <SearchIcon />
        </Button>
      </ButtonGroup>

      <div className="flex flex-wrap gap-2">
        {TIPOS_MANDADOS.map((tipo) => (
          <Button
            key={tipo.value}
            variant={query.tipo === tipo.value ? "default" : "outline"}
            size="sm"
            onClick={() =>
              setQuery({ tipo: query.tipo === tipo.value ? null : tipo.value as TipoMandado })
            }
          >
            {tipo.label}
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          variant={query.estado === null ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setQuery({ estado: null })}
        >
          Todos
        </Button>
        {ESTADOS_MANDADOS.map((est) => (
          <Button
            key={est.value}
            variant={query.estado === est.value ? "secondary" : "ghost"}
            size="sm"
            onClick={() =>
              setQuery({ estado: query.estado === est.value ? null : est.value as EstadoValue })
            }
          >
            {est.label}
          </Button>
        ))}
      </div>
    </div>
  );
}