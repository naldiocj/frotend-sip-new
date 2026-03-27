"use client";

import { ProcessoListItem } from "@/lib/dto/processo.dto";
import { parsers } from "@/lib/searchparams";
import { SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";

interface iAppProps {
  promise: Promise<ProcessoListItem[]>;
}

export default function SearchProcesso({ promise }: iAppProps) {
  const [query, setQuery] = useQueryState("q", {
    ...parsers.q,
    defaultValue: "",
    shallow: false, // Não faz refresh da página inteira
    throttleMs: 500, // Debounce embutido!
    clearOnDefault: true,
  });

  // const filtered = processos.filter(
  //   (p: ProcessoListItem) =>
  //     p.numero.toLowerCase().includes(search.toLowerCase()) ||
  //     p.descricao?.toLowerCase().includes(search.toLowerCase()),
  // );

  return (
    <ButtonGroup className="w-full">
      <Input
        value={query}
        placeholder="Pesquisar por número ou descrição..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="outline" aria-label="Pesquisar por número ou descrição">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
