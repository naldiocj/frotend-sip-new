"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchDocumentoProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export default function SearchDocumento({
  query,
  onQueryChange,
}: SearchDocumentoProps) {
  return (
    <ButtonGroup className="w-full">
      <Input
        value={query}
        placeholder="Pesquisar por nome do documento ou descrição"
        onChange={(e) => onQueryChange(e.target.value)}
        className="h-full text-2xl font-bold px-5"
      />
      <Button
        variant="outline"
        aria-label="Pesquisar por número ou descrição"
        className="h-full cursor-pointer"
      >
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
