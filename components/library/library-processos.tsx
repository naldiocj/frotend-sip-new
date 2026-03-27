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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { convertData } from "@/lib/date-utils";
import { ProcessoListItem } from "@/lib/dto/processo.dto";
import { INSTRUTOR_PATHS } from "@/lib/path";
import { replaceAllChar } from "@/lib/utils";
import {
  Calendar,
  ChevronRight,
  Clock,
  Edit2,
  FolderOpen,
  MoreVertical,
  Scale,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

interface iAppProps {
  promise: Promise<ProcessoListItem[]>;
}

export default function LibraryProcesso({ promise }: iAppProps) {
  const processos = use(promise);

  return (
    <div className="w-full space-y-6 bg-background">
      {processos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl bg-muted/30">
          <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium text-foreground">
            Nenhum processo encontrado
          </h3>
          <p className="text-muted-foreground">
            Experimente ajustar os termos da pesquisa.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {processos.length > 0 &&
            processos.map((processo: ProcessoListItem) => (
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
                </>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
