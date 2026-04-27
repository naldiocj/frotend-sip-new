import { getMandados } from "@/app/services/mandado.service";
import { MandadoDataTable } from "@/components/table/mandado-data-table";
import SearchMandado from "@/components/table/search-mandado";
import { searchParamsCache } from "@/lib/searchparams";
import { FileSignature, Scale } from "lucide-react";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { q, tipo, estado } = searchParamsCache.parse(await searchParams);
  const mandatePromise = getMandados(q, tipo as any, estado);
  const mandates = await mandatePromise;
  const refreshKey = mandates.map((m) => m.id).join(",");

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
                Mandados
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte e filtre os mandatos do sistema em formato de tabela.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-t border-border/60 px-6 py-4 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Scale className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Total
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {mandates.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 dark:bg-amber-500/15">
                <FileSignature className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Pendentes
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {mandates.filter((m) => m.estado === "PENDENTE").length}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="border-b border-border/60 px-6 py-4 lg:px-8">
            <SearchMandado />
          </div>
          <div className="p-6 lg:p-8">
            <MandadoDataTable key={refreshKey} promise={mandatePromise} />
          </div>
        </section>
      </div>
    </main>
  );
}