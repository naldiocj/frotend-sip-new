"use client";

import { convertData } from "@/lib/date-utils";
import { DOCUMENT_NAMES } from "@/lib/document-names";
import { ProcessoDocumentoItem } from "@/lib/dto/processo.dto";
import { Calendar, Edit2, MoreVertical, Timer, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { GroupButtonDocumentos } from "./group-button-documentos";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface iAppProps {
  data: ProcessoDocumentoItem[];
}

const PAGE_SIZE = 8;

export function DocumentosCard({ data }: iAppProps) {
  const [pageIndex, setPageIndex] = useState(0);

  const pageCount = Math.max(1, Math.ceil(data.length / PAGE_SIZE));

  const currentDocuments = useMemo(
    () => data.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE),
    [data, pageIndex],
  );

  const handlePageChange = (newIndex: number) => {
    setPageIndex(Math.min(Math.max(newIndex, 0), pageCount - 1));
  };

  return (
    <section className="space-y-6">
      {/* Summary strip */}
      <div className="flex gap-4 rounded-xl border border-border/60 bg-muted/40 p-5 dark:bg-muted/20 flex-row items-center justify-between">
        <div className="">
          <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
            Apresentação de Documentos
          </p>
          {/* <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            {data.length} {data.length === 1 ? "Documento" : "Documentos"}
          </h2> */}
        </div>
        <div className="rounded-xl border border-border/60 bg-card px-4 py-3 shadow-xs">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
            Página atual
          </p>
          <p className="mt-1 font-mono text-lg font-semibold text-foreground">
            {pageIndex + 1} / {pageCount}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {currentDocuments.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-border/60 bg-card p-12 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhum documento disponível.
            </p>
          </div>
        ) : (
          currentDocuments.map((documento) => (
            <Card
              key={documento.id}
              className="group relative overflow-hidden border-border/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Top accent stripe */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-primary/60" />

              <CardHeader className="pb-3 pt-6">
                <div className="flex items-start justify-between gap-3">
                  <Badge
                    variant="secondary"
                    className="text-[10px] uppercase tracking-[.22em]"
                  >
                    Documento
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Edit2 className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="mt-2 text-base font-semibold text-foreground">
                  {Object.keys(DOCUMENT_NAMES).includes(documento.tipo)
                    ? DOCUMENT_NAMES[documento.tipo]
                    : documento.tipo}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 border-t border-border/60 px-4 pb-3 pt-4">
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                    <span className="font-medium text-foreground">Página</span>
                    <span className="font-mono text-muted-foreground">
                      {documento.documento.pagina}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                    <span className="font-medium text-foreground">
                      Carregado em
                    </span>
                    <span className="font-mono text-muted-foreground">
                      {convertData(documento.createdAt)}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-border/60 bg-muted/30 px-4 py-3 dark:bg-muted/10">
                <GroupButtonDocumentos
                  id={documento.id}
                  url={documento.url}
                  documento={documento.documento}
                />
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={
                  pageIndex === 0
                    ? undefined
                    : () => handlePageChange(pageIndex - 1)
                }
                className={
                  pageIndex === 0 ? "pointer-events-none opacity-50" : undefined
                }
              />
            </PaginationItem>
            {Array.from({ length: pageCount }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index === pageIndex}
                  onClick={() => handlePageChange(index)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={
                  pageIndex === pageCount - 1
                    ? undefined
                    : () => handlePageChange(pageIndex + 1)
                }
                className={
                  pageIndex === pageCount - 1
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}
