import { getDespachos } from "@/app/services/despacho.service";
import { DespachoDataTable } from "@/components/table/despacho-data-table";
import SearchDespacho from "@/components/table/search-despacho";
import { searchParamsCache } from "@/lib/searchparams";
import { FileText, Users } from "lucide-react";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { q } = searchParamsCache.parse(await searchParams);
  const despachosPromise = getDespachos(q);
  console.log(await despachosPromise);
  const despachos = await despachosPromise;
  const refreshKey = despachos
    .map((item) => item.id ?? `${item.numeroProcesso}-${item.dataDespacho}`)
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
                Despachos
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte, filtre e registe os despachos do sistema em formato de
                tabela.
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
                  {despachos.length}{" "}
                  {despachos.length === 1 ? "despacho" : "despachos"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 dark:bg-blue-500/15">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Finalizados
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {despachos.filter((d) => d.isFinalizado).length}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="border-b border-border/60 px-6 py-4 lg:px-8">
            <div className="max-w-lg">
              <SearchDespacho />
            </div>
          </div>
          <div className="p-6 lg:p-8">
            <DespachoDataTable key={refreshKey} promise={despachosPromise} />
          </div>
        </section>
      </div>
    </main>
  );
}
