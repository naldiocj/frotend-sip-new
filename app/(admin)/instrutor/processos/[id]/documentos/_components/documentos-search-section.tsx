"use client";

import { useMemo, useState } from "react";
import { DocumentosCard } from "@/components/documentos-card";
import { DocumentosDataTable } from "@/components/patterns/documentos-datatable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, LayoutGrid, TableProperties } from "lucide-react";
import SearchDocumento from "./search-documentos";
import { ProcessoDocumentoItem } from "@/lib/dto/processo.dto";

interface DocumentosSearchSectionProps {
  data: ProcessoDocumentoItem[];
}

export function DocumentosSearchSection({ data }: DocumentosSearchSectionProps) {
  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return data;

    return data.filter((documento) => {
      const titulo = documento.titulo?.toLowerCase() ?? "";
      const descricao = documento.descricao?.toLowerCase() ?? "";
      const processoNumero = documento.processoNumero?.toLowerCase() ?? "";

      return (
        titulo.includes(search) ||
        descricao.includes(search) ||
        processoNumero.includes(search)
      );
    });
  }, [data, query]);

  return (
    <Tabs defaultValue="card">
      <div className="flex flex-col gap-4 border-b border-border/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold text-foreground">Modo de exibição</p>
          <p className="text-xs text-muted-foreground">
            Cards ou tabela — conforme o seu fluxo preferido.
          </p>
        </div>

        <TabsList className="h-auto shrink-0 rounded-xl border border-border/50 bg-muted/50 p-1 dark:bg-muted/30">
          <TabsTrigger
            value="card"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-xs data-[state=active]:ring-1 data-[state=active]:ring-border/40 dark:data-[state=active]:bg-card"
          >
            <LayoutGrid className="h-4 w-4" />
            Cards
          </TabsTrigger>
          <TabsTrigger
            value="table"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-xs data-[state=active]:ring-1 data-[state=active]:ring-border/40 dark:data-[state=active]:bg-card"
          >
            <TableProperties className="h-4 w-4" />
            Tabela
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="px-6 py-6 lg:px-8">
        <div className="rounded-xl border border-border/60 bg-muted/40 p-4 dark:bg-muted/20">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <SearchDocumento query={query} onQueryChange={setQuery} />
            <div className="rounded-2xl bg-background px-4 py-3 text-sm text-muted-foreground">
              <div className="font-semibold text-foreground">Filtrados</div>
              <div>{filteredData.length} documento(s)</div>
            </div>
          </div>
        </div>
      </div>

      <TabsContent value="card" className="mt-0 p-6 lg:p-8">
        <div className="space-y-5">
          <DocumentosCard data={filteredData} />
        </div>
      </TabsContent>

      <TabsContent value="table" className="mt-0 p-6 lg:p-8">
        <DocumentosDataTable data={filteredData} />
      </TabsContent>
    </Tabs>
  );
}
