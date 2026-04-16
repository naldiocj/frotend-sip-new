"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUser } from "@/hooks/user-context";

import { convertData } from "@/lib/date-utils";
import { ProcessoListItem } from "@/lib/dto/processo.dto";
import { INSTRUTOR_PATHS } from "@/lib/path";
import { replaceAllChar } from "@/lib/utils";
import {
  Calendar,
  ChevronRight,
  Clock,
  Edit2,
  Folder,
  FolderOpen,
  MoreVertical,
  Scale,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Separator } from "../ui/separator";
import AtribuirDirecaoModal from "@/app/(admin)/secretaria-geral/direccoes/_components/@modals/atribuir-direcao-modal";
import { DireccaoDTO } from "@/lib/dto/direccao.dto";

interface iAppProps {
  processos: ProcessoListItem[];
  direccoesPromise: Promise<DireccaoDTO[]>;
  processosPromise?: Promise<ProcessoListItem[]>;
}

export default function LibraryProcesso({
  processos,
  direccoesPromise,
  processosPromise,
}: iAppProps) {
  const [page, setPage] = useState(1);
  const { isInstrutor, isSecretaria, isSecretariaGeral } = useUser();
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(processos.length / pageSize));
  const [open, setOpen] = useState(false);
  const [processoId, setProcessoId] = useState("");

  useEffect(() => {
    setPage(1);
  }, [processos.length]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedProcessos = useMemo(() => {
    const start = (page - 1) * pageSize;
    return processos.slice(start, start + pageSize);
  }, [processos, page]);

  return (
    <div className="w-full space-y-6 bg-transparent">
      {processos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl bg-transparent">
          <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xs font-semibold text-foreground">
            Nenhum processo a seu cargo foi encontrado.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-muted/30 p-4 rounded-2xl">
            {paginatedProcessos.length > 0 &&
              paginatedProcessos.map((processo: ProcessoListItem) => (
                <Card
                  key={processo.id}
                  className="relative overflow-hidden border-l-4 border-l-primary hover:shadow-xl transition-all duration-300 group cursor-default"
                >
                  <>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2 bg-primary/5 ">
                          Processo Judiciário
                        </Badge>
                        {isSecretaria ||
                          (isSecretariaGeral && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuGroup className="space-y-2">
                                  {isSecretariaGeral &&
                                    processo.direcao === null && (
                                      <>
                                        <DropdownMenuLabel>
                                          Atribuir
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem
                                          className="gap-2"
                                          onClick={() => {
                                            setOpen(true);
                                            setProcessoId(String(processo.id));
                                          }}
                                        >
                                          <Folder className="h-4 w-4" />
                                          Direcção
                                        </DropdownMenuItem>

                                        <Separator />
                                      </>
                                    )}
                                  {isSecretaria && (
                                    <>
                                      <DropdownMenuItem className="gap-2">
                                        <User className="h-4 w-4" />
                                        Instrutor
                                      </DropdownMenuItem>
                                      <Separator />
                                    </>
                                  )}
                                </DropdownMenuGroup>

                                <DropdownMenuGroup className="space-y-2">
                                  <DropdownMenuLabel>Acções</DropdownMenuLabel>
                                  <DropdownMenuItem className="gap-2">
                                    <Edit2 className="h-4 w-4" />
                                    Editar
                                  </DropdownMenuItem>
                                  {isSecretariaGeral && (
                                    <>
                                      <Separator />
                                      <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                        Remover
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ))}
                      </div>
                      <CardTitle className="text-2xl font-black text-foreground light:group-hover:text-primary transition-colors">
                        {processo.numero}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="h-[100px] text-sm text-muted-foreground line-clamp-4 leading-relaxed italic">
                        {processo.descricao ||
                          "Sem descrição detalhada disponível."}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-muted">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Ano: {processo.ano}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {convertData(processo.createdAt as any)}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground col-span-2">
                          <Scale className="h-3 w-3" />
                          Tipo: {processo.tipoProcesso}
                        </div>
                      </div>
                    </CardContent>
                    {isInstrutor && (
                      <CardFooter className="pt-0 border-t border-muted/50 bg-muted/5 mt-4">
                        <Link
                          href={`${INSTRUTOR_PATHS.PROCESSOS}/${replaceAllChar(processo.numero, "/", "-")}`}
                          className="w-full"
                        >
                          <Button
                            variant="link"
                            className="px-0 h-10 text-primary font-bold group-hover:translate-x-1 transition-transform"
                          >
                            Abrir Dossier Completo
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    )}
                  </>
                </Card>
              ))}
          </div>
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-3 rounded-3xl border border-border/60 bg-muted p-4">
              <Pagination className="w-full max-w-xl">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={(event) => {
                        event.preventDefault();
                        setPage((current) => Math.max(1, current - 1));
                      }}
                      disabled={page <= 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          isActive={pageNumber === page}
                          onClick={(event) => {
                            event.preventDefault();
                            setPage(pageNumber);
                          }}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={(event) => {
                        event.preventDefault();
                        setPage((current) => Math.min(totalPages, current + 1));
                      }}
                      disabled={page >= totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <p className="text-sm text-muted-foreground">
                Página {page} de {totalPages} — mostrando{" "}
                {paginatedProcessos.length} de {processos.length} processos
              </p>
            </div>
          )}
        </>
      )}

      <AtribuirDirecaoModal
        direccoesPromise={direccoesPromise}
        processosPromise={processosPromise}
        open={open}
        setOpen={setOpen}
        processoId={processoId}
      />
    </div>
  );
}
