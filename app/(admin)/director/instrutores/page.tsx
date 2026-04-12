import { getInstrutores } from "@/app/services/director.service";
import { getUserSession } from "@/app/services/user.service";
import { Badge } from "@/components/ui/badge";
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
import { InstrutorDetailDTO } from "@/lib/dto/direcao.dto";
import { searchParamsCache } from "@/lib/searchparams";
import {
  BriefcaseBusiness,
  Building2,
  LayoutGrid,
  Search,
  Shield,
  TableProperties,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function extractDirecaoId(session: any): string | null {
  const candidates = [
    session?.data?.direcaoId,
    session?.data?.direccaoId,
    session?.data?.idDirecao,
    session?.data?.idDireccao,
    session?.data?.direcao?.id,
    session?.data?.direccao?.id,
    session?.data?.director?.direcaoId,
    session?.data?.director?.direccaoId,
    session?.data?.director?.idDirecao,
    session?.data?.director?.idDireccao,
    session?.data?.director?.direcao?.id,
    session?.data?.director?.direccao?.id,
  ];

  const value = candidates.find(
    (candidate) => candidate !== undefined && candidate !== null && candidate !== "",
  );

  return value ? String(value) : null;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function filterInstrutores(instrutores: InstrutorDetailDTO[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return instrutores;
  }

  return instrutores.filter((instrutor) =>
    [
      instrutor.nomeCompleto,
      instrutor.patente,
      instrutor.direcao,
      instrutor.cargoId,
    ]
      .filter((value): value is string => Boolean(value))
      .some((value) => value.toLowerCase().includes(normalizedQuery)),
  );
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = searchParamsCache.parse(await searchParams);
  const session = await getUserSession();
  const direcaoId = extractDirecaoId(session);

  const instrutores = direcaoId ? await getInstrutores(direcaoId) : [];
  const filteredInstrutores = filterInstrutores(instrutores, q);

  const totalPatentes = new Set(
    filteredInstrutores.map((instrutor) => instrutor.patente).filter(Boolean),
  ).size;
  const totalCargos = new Set(
    filteredInstrutores.map((instrutor) => instrutor.cargoId).filter(Boolean),
  ).size;
  const direcaoNome = filteredInstrutores[0]?.direcao || instrutores[0]?.direcao || "Não informada";

  return (
    <main className="bg-background px-4">
      <div className="flex flex-col gap-6">
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Gestão de Instrutores
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Instrutores da Direção
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte os instrutores vinculados à sua direção e alterne entre
                os modos de cartões e tabela conforme o seu fluxo de trabalho.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-t border-border/60 px-6 py-4 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Total
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {filteredInstrutores.length}{" "}
                  {filteredInstrutores.length === 1 ? "instrutor" : "instrutores"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 dark:bg-blue-500/15">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Patentes
                </p>
                <p className="text-sm font-semibold text-foreground">{totalPatentes}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 dark:bg-amber-500/15">
                <BriefcaseBusiness className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Cargos
                </p>
                <p className="text-sm font-semibold text-foreground">{totalCargos}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500 dark:bg-violet-500/15">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Direção
                </p>
                <p className="text-sm font-semibold text-foreground">{direcaoNome}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <Tabs defaultValue="library-mode">
            <div className="flex flex-col gap-4 border-b border-border/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
              <form method="GET" className="relative flex-1 max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Pesquisar por nome, patente, cargo..."
                  className="pl-9"
                />
              </form>

              <TabsList className="h-auto shrink-0 rounded-xl border border-border/50 bg-muted/50 p-1 dark:bg-muted/30">
                <TabsTrigger
                  value="library-mode"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-xs data-[state=active]:ring-1 data-[state=active]:ring-border/40 dark:data-[state=active]:bg-card"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Cards
                </TabsTrigger>
                <TabsTrigger
                  value="list-mode"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-xs data-[state=active]:ring-1 data-[state=active]:ring-border/40 dark:data-[state=active]:bg-card"
                >
                  <TableProperties className="h-4 w-4" />
                  Tabela
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="library-mode" className="mt-0 p-6 lg:p-8">
              {!direcaoId ? (
                <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 p-8 text-center text-sm text-muted-foreground">
                  Não foi possível identificar a direção do diretor autenticado.
                </div>
              ) : filteredInstrutores.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 p-8 text-center text-sm text-muted-foreground">
                  Nenhum instrutor encontrado para os filtros informados.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredInstrutores.map((instrutor) => (
                    <article
                      key={instrutor.id}
                      className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-xs ring-1 ring-foreground/5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-foreground">
                            {instrutor.nomeCompleto}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {instrutor.patente}
                          </p>
                        </div>
                        <Badge variant="secondary">#{instrutor.id}</Badge>
                      </div>

                      <div className="mt-5 grid gap-3 text-sm">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-muted-foreground">Cargo</span>
                          <span className="font-medium text-foreground">
                            {instrutor.cargoId || "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-muted-foreground">Direção</span>
                          <span className="font-medium text-foreground">
                            {instrutor.direcao || "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-muted-foreground">Atualizado</span>
                          <span className="font-medium text-foreground">
                            {formatDate(instrutor.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="list-mode" className="mt-0 p-6 lg:p-8">
              {!direcaoId ? (
                <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 p-8 text-center text-sm text-muted-foreground">
                  Não foi possível identificar a direção do diretor autenticado.
                </div>
              ) : filteredInstrutores.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 p-8 text-center text-sm text-muted-foreground">
                  Nenhum instrutor encontrado para os filtros informados.
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-border/60">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome completo</TableHead>
                        <TableHead>Patente</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>Direção</TableHead>
                        <TableHead>Atualizado em</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInstrutores.map((instrutor) => (
                        <TableRow key={instrutor.id}>
                          <TableCell className="font-medium">{instrutor.id}</TableCell>
                          <TableCell>{instrutor.nomeCompleto}</TableCell>
                          <TableCell>{instrutor.patente}</TableCell>
                          <TableCell>{instrutor.cargoId || "—"}</TableCell>
                          <TableCell>{instrutor.direcao || "—"}</TableCell>
                          <TableCell>{formatDate(instrutor.updatedAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}
