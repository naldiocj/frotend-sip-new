import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { convertData } from "@/lib/date-utils";
import { DetidoDTO } from "@/lib/dto/detido.dto";
import { searchParamsCache } from "@/lib/searchparams";
import {
  CircleSlash,
  Eye,
  FileEdit,
  LayoutGrid,
  MoreHorizontal,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const estadoDetencaoColors: Record<string, string> = {
  DETIDO: "bg-red-500",
  LIBERTADO: "bg-green-500",
  TRANSITO: "bg-yellow-500",
};

const estadoDetencaoLabels: Record<string, string> = {
  DETIDO: "Detido",
  LIBERTADO: "Libertado",
  TRANSITO: "Em trânsito",
};

async function DetidosTable({ detidos }: { detidos: DetidoDTO[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">#</TableHead>
          <TableHead>Nome Completo</TableHead>
          <TableHead>Nº BI</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Data Detenção</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {detidos.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <CircleSlash className="h-8 w-8" />
                <p>Nenhum detido registado</p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          detidos.map((detido, index) => (
            <TableRow key={detido.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="font-medium">{detido.nomeCompleto}</p>
                  <p className="text-xs text-muted-foreground">
                    {detido.profissao} • {detido.idade} anos
                  </p>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">
                {detido.numeroBi}
              </TableCell>
              <TableCell>{detido.telefone}</TableCell>
              <TableCell>
                <Badge
                  className={`${estadoDetencaoColors[detido.estadoDetencao]} hover:${estadoDetencaoColors[detido.estadoDetencao]}`}
                >
                  {estadoDetencaoLabels[detido.estadoDetencao]}
                </Badge>
              </TableCell>
              <TableCell>
                {detido.dataDetencao ? convertData(detido.dataDetencao) : "—"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/admin/detidos/${detido.id}`}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Ver detalhes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/admin/detidos/${detido.id}/editar`}
                        className="flex items-center gap-2"
                      >
                        <FileEdit className="h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = searchParamsCache.parse(await searchParams);
  // const detidos: DetidoDTO[] = (await getDetidos(q)) || [];
  const detidos: DetidoDTO[] = [];

  const detidosCount = detidos.length;
  const detidosAtivos = detidos.filter(
    (d) => d.estadoDetencao === "DETIDO",
  ).length;
  const detidosLibertados = detidos.filter(
    (d) => d.estadoDetencao === "LIBERTADO",
  ).length;

  return (
    <main className="bg-background px-4">
      <div className="flex flex-col gap-6">
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Gestão de Detidos
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Registos de detidos
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte e gerencie os detidos em custódia. Mantenha os registos
                atualizados para controle da instrução processual.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                    Total de detidos
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {detidosCount}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                    Detidos
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {detidosAtivos}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                    Libertados
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {detidosLibertados}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5 p-6 lg:p-8">
          <Tabs defaultValue="table">
            <div className="flex flex-col gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="grid" className="gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  Grelha
                </TabsTrigger>
                <TabsTrigger value="table" className="gap-2">
                  <Users className="h-4 w-4" />
                  Tabela
                </TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <Input
                  placeholder="Pesquisar detido..."
                  className="w-full sm:w-[300px]"
                  defaultValue={q}
                />
                <Button type="submit">Pesquisar</Button>
              </div>
            </div>

            <TabsContent value="table" className="mt-4">
              <Suspense fallback={<div className="p-8">Carregando...</div>}>
                <DetidosTable detidos={detidos} />
              </Suspense>
            </TabsContent>

            <TabsContent value="grid" className="mt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {detidos.map((detido) => (
                  <div
                    key={detido.id}
                    className="rounded-lg border border-border/60 bg-muted/20 p-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{detido.nomeCompleto}</p>
                          <p className="text-xs text-muted-foreground">
                            {detido.idade} anos • {detido.profissao}
                          </p>
                        </div>
                        <Badge
                          className={`${estadoDetencaoColors[detido.estadoDetencao]} hover:${estadoDetencaoColors[detido.estadoDetencao]}`}
                        >
                          {estadoDetencaoLabels[detido.estadoDetencao]}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Nº BI: {detido.numeroBi}</p>
                        <p>Tel: {detido.telefone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}
