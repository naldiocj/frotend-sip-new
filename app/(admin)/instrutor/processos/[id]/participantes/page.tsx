import { getParticipantes } from "@/app/services/participante.service";
import { ParticipantesDataTable } from "@/components/patterns/participantes-datatable";
import { ParticipantesDropdown } from "@/components/patterns/participantes-dropdown";
import { PARTICIPANTES } from "@/lib/constants";
import { BriefcaseBusiness, Eye, Gavel, UserRound, Users } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const data = await getParticipantes(id);

  const queixosos = data.filter(
    (p) => p.tipoParticipante === PARTICIPANTES.QUEIXOSO,
  ).length;
  const arguidos = data.filter(
    (p) => p.tipoParticipante === PARTICIPANTES.ARGUIDO,
  ).length;
  const advogados = data.filter(
    (p) => p.tipoParticipante === PARTICIPANTES.ADVOGADO,
  ).length;
  const testemunhas = data.filter(
    (p) => p.tipoParticipante === PARTICIPANTES.TESTEMUNHA,
  ).length;

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
                Participantes do Processo
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Registe e acompanhe todos os intervenientes do processo:
                queixosos, arguidos, advogados e testemunhas.
              </p>
            </div>

            {/* Right — action */}
            <div className="shrink-0">
              <ParticipantesDropdown />
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap items-center gap-6 border-t border-border/60 px-6 py-4 lg:px-8">
            {/* Total */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Total
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {data.length}{" "}
                  {data.length === 1 ? "participante" : "participantes"}
                </p>
              </div>
            </div>

            {/* Queixosos */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/15">
                <UserRound className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Queixosos
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {queixosos}
                </p>
              </div>
            </div>

            {/* Arguidos */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500 dark:bg-rose-500/15">
                <Gavel className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Arguidos
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {arguidos}
                </p>
              </div>
            </div>

            {/* Advogados */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500 dark:bg-violet-500/15">
                <BriefcaseBusiness className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Advogados
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {advogados}
                </p>
              </div>
            </div>

            {/* Testemunhas */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 dark:bg-amber-500/15">
                <Eye className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Testemunhas
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {testemunhas}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Table ──────────────────────────────────────────────────────── */}
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="border-b border-border/60 px-6 py-4 lg:px-8">
            <p className="text-sm font-semibold text-foreground">
              Listagem de participantes
            </p>
            <p className="text-xs text-muted-foreground">
              Todos os intervenientes registados neste processo
            </p>
          </div>
          <div className="p-6 lg:p-8">
            <ParticipantesDataTable data={data} />
          </div>
        </section>
      </div>
    </main>
  );
}
