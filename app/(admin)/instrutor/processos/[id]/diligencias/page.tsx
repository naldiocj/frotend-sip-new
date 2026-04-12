import { getDiligencias } from "@/app/services/diligencia.service";
import { DiligenciasTimeLine } from "@/components/patterns/diligencias-timeline";
import { CheckCircle2, ClipboardList, Clock } from "lucide-react";
import AddDiligenciaModal from "./_components/add-diligencia-modal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const diligencias = await getDiligencias(id);

  const concluidas = diligencias.filter((d) => d.estado === "CONCLUIDA").length;
  const pendentes = diligencias.filter((d) => d.estado === "PENDENTE").length;

  return (
    <main className="bg-background">
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
                Diligências do Processo
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Registe e acompanhe as diligências realizadas no âmbito deste
                processo. Cada entrada documenta uma etapa relevante da
                instrução.
              </p>
            </div>

            {/* Right — action */}
            <div className="shrink-0">
              <AddDiligenciaModal />
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap items-center gap-6 border-t border-border/60 px-6 py-4 lg:px-8">
            {/* Total */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ClipboardList className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Total
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {diligencias.length}{" "}
                  {diligencias.length === 1 ? "diligência" : "diligências"}
                </p>
              </div>
            </div>

            {/* Concluídas */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/15">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Concluídas
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {concluidas}
                </p>
              </div>
            </div>

            {/* Pendentes */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 dark:bg-amber-500/15">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Pendentes
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {pendentes}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Timeline ───────────────────────────────────────────────────── */}
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <DiligenciasTimeLine data={diligencias} />
        </section>
      </div>
    </main>
  );
}
