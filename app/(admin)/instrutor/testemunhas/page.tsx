import { getTestemunhas } from "@/app/services/testemunha.service";
import { TestemunhaDataTable } from "@/components/table/testemunha-data-table";
import SearchTestemunha from "@/components/table/search-testemunha";
import { searchParamsCache } from "@/lib/searchparams";
import { Eye, Users } from "lucide-react";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { q } = searchParamsCache.parse(await searchParams);
  const testemunhasPromise = getTestemunhas(q);
  const testemunhas = await testemunhasPromise;
  const refreshKey = testemunhas
    .map((item) => item.id ?? item.numeroBi)
    .join(",");

  return (
    <main className="bg-background px-4">
      <div className="flex flex-col gap-6">
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Instrução Processual
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Registo de Testemunhas
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte, filtre e registe as testemunhas do sistema em formato
                de tabela.
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
                  {testemunhas.length}{" "}
                  {testemunhas.length === 1 ? "testemunha" : "testemunhas"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 dark:bg-amber-500/15">
                <Eye className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Registos activos
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {testemunhas.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="border-b border-border/60 px-6 py-4 lg:px-8">
            <div className="max-w-lg">
              <SearchTestemunha />
            </div>
          </div>
          <div className="p-6 lg:p-8">
            <TestemunhaDataTable key={refreshKey} promise={testemunhasPromise} />
          </div>
        </section>
      </div>
    </main>
  );
}
