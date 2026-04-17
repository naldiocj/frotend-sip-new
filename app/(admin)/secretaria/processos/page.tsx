import { getDireccoes } from "@/app/services/direccao.service";
import { getInstrutores } from "@/app/services/director.service";
import { getProcessos } from "@/app/services/processo.service";
import { getTiposCrimes } from "@/app/services/tipo-crime.service";
import { getUserSession } from "@/app/services/user.service";
import LibraryProcesso from "@/components/library/library-processos";
import { CreateProcessoModal } from "@/components/modal/create-processo";
import {
  ProcessoDataTable,
  SkeletonProcessDataTable,
} from "@/components/table/processo-data-table";
import SearchProcesso from "@/components/table/search-processo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { searchParamsCache } from "@/lib/searchparams";
import {
  Archive,
  FolderOpen,
  LayoutGrid,
  Scale,
  Send,
  TableProperties,
} from "lucide-react";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { q } = searchParamsCache.parse(await searchParams);
  const processosPromise = getProcessos(q);
  const direccoesPromise = getDireccoes();
  const tiposCrimesPromise = getTiposCrimes();
  const { data } = await getUserSession();
  const instrutoresPromise = getInstrutores(data?.direcao.id || "");

  const processos = await processosPromise;
  const refreshKey = processos.map((p) => p.id).join(",");

  /* ── Stats ──────────────────────────────────────────────────────── */
  const emInstrucao = processos.filter(
    (p) => p.estadoProcesso === "EM_INSTRUCAO",
  ).length;
  const arquivados = processos.filter(
    (p) => p.estadoProcesso === "ARQUIVADO",
  ).length;
  const remetidos = processos.filter(
    (p) =>
      p.estadoProcesso === "REMETIDO_JUIZO" ||
      p.estadoProcesso === "REMETIDO_PGR",
  ).length;

  return (
    <main className="bg-background px-4">
      <div className="flex flex-col gap-6">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            {/* Left — title */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Instrução Processual
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Processos em Instrução
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte e gerencie todos os processos criminais em instrução.
                Alterne entre o modo Livraria e Tabela conforme o seu fluxo
                preferido.
              </p>
            </div>

            {/* Right — action */}
            <div className="shrink-0">
              <Suspense>
                <CreateProcessoModal tiposCrimesPromise={tiposCrimesPromise} />
              </Suspense>
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap items-center gap-6 border-t border-border/60 px-6 py-4 lg:px-8">
            {/* Total */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FolderOpen className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Total
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {processos.length}{" "}
                  {processos.length === 1 ? "processo" : "processos"}
                </p>
              </div>
            </div>

            {/* Em instrução */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 dark:bg-blue-500/15">
                <Scale className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Em instrução
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {emInstrucao}
                </p>
              </div>
            </div>

            {/* Arquivados */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 dark:bg-amber-500/15">
                <Archive className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Arquivados
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {arquivados}
                </p>
              </div>
            </div>

            {/* Remetidos */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500 dark:bg-violet-500/15">
                <Send className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Remetidos
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {remetidos}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content (Tabs) ─────────────────────────────────────────────── */}
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <Tabs defaultValue="library-mode">
            {/* Tab header */}
            <div className="flex flex-col gap-4 border-b border-border/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
              {/* Search */}
              <div className="flex-1 max-w-sm">
                <SearchProcesso promise={processosPromise} />
              </div>

              {/* Segmented control */}
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

            {/* Library tab */}
            <TabsContent value="library-mode" className="mt-0 p-6 lg:p-8">
              <LibraryProcesso
                instrutoresPromise={instrutoresPromise}
                direccoesPromise={direccoesPromise}
                processos={processos}
              />
            </TabsContent>

            {/* Table tab */}
            <TabsContent value="list-mode" className="mt-0 p-6 lg:p-8">
              <Suspense
                fallback={
                  <SkeletonProcessDataTable promise={processosPromise} />
                }
              >
                <ProcessoDataTable
                  key={refreshKey}
                  promise={processosPromise}
                />
              </Suspense>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}
