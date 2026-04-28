"use client";

import { parsers } from "@/lib/searchparams";
import { SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";

export default function SearchQueixoso() {
  const [query, setQuery] = useQueryState("q", {
    ...parsers.q,
    defaultValue: "",
    shallow: false,
    throttleMs: 500,
    clearOnDefault: true,
  });

  return (
    <ButtonGroup className="w-full">
      <Input
        value={query}
        placeholder="Pesquisar queixoso por nome, BI, telefone ou email..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        variant="outline"
        className="h-auto"
        aria-label="Pesquisar queixoso por nome, BI, telefone ou email"
      >
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
