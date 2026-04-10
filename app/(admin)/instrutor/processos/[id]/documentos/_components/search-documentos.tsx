"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { parsers } from "@/lib/searchparams";
import { SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";

export default function SearchDocumento() {
  const [query, setQuery] = useQueryState("q", {
    ...parsers.q,
    defaultValue: "",
    shallow: false, // Não faz refresh da página inteira
    throttleMs: 500, // Debounce embutido!
    clearOnDefault: true,
  });

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
