"use client";

import { parsers } from "@/lib/searchparams";
import { SearchIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";

export default function SearchNotificacao() {
  const [query, setQuery] = useQueryStates(
    {
      q: parsers.q,
      lida: { ...parsers.lida, defaultValue: null },
    },
    { shallow: false, throttleMs: 500, clearOnDefault: true },
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <ButtonGroup className="flex-1">
        <Input
          value={query.q}
          placeholder="Pesquisar notificações..."
          onChange={(e) => setQuery({ q: e.target.value })}
        />
        <Button
          variant="outline"
          aria-label="Pesquisar notificações"
        >
          <SearchIcon />
        </Button>
      </ButtonGroup>
      <div className="flex gap-2">
        <Button
          variant={query.lida === null ? "default" : "outline"}
          size="sm"
          onClick={() => setQuery({ lida: null })}
        >
          Todas
        </Button>
        <Button
          variant={query.lida === "false" ? "default" : "outline"}
          size="sm"
          onClick={() => setQuery({ lida: "false" })}
        >
          Não lidas
        </Button>
        <Button
          variant={query.lida === "true" ? "default" : "outline"}
          size="sm"
          onClick={() => setQuery({ lida: "true" })}
        >
          Lidas
        </Button>
      </div>
    </div>
  );
}