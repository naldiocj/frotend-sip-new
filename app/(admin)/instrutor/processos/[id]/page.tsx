import { getProcessoById } from "@/app/services/processo.service";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  convertData,
  convertEstadoProcessoToNormalCase,
  getBageEstadoProcesso,
} from "@/lib/date-utils";
import { ProcessoItem } from "@/lib/dto/processo.dto";
import { getCrimeTexto } from "@/lib/utils";
import {
  AlertTriangle,
  Calendar,
  Clock,
  FileText,
  Gavel,
  Hash,
  Tag,
} from "lucide-react";

/* ─── helpers ─────────────────────────────────────────────────────────── */

function mapTipoProcesso(tipo: string | null): string {
  const map: Record<string, string> = {
    NORMAL: "Normal",
    AVERIGUACAO: "Averiguação",
    COM_DETIDO: "Com Detido",
  };
  return tipo ? (map[tipo] ?? tipo) : "—";
}

function InfoField({
  label,
  value,
  icon: Icon,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ElementType;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/40 p-4 space-y-2.5 dark:bg-muted/20">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.22em] text-muted-foreground">
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
        {label}
      </div>
      <div
        className={`text-sm font-semibold text-foreground ${mono ? "font-mono" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}

/* ─── metrics config ──────────────────────────────────────────────────── */

function getMetrics(processo: ProcessoItem) {
  return [
    {
      title: "Tipologia",
      value: mapTipoProcesso(processo.tipoProcesso),
      icon: Tag,
      colorCls: "bg-violet-500/10 text-violet-500 dark:bg-violet-500/15",
    },
    {
      title: "Ano judicial",
      value: processo.ano,
      icon: Calendar,
      colorCls: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/15",
    },
    {
      title: "Crimes imputados",
      value: processo.crimes.length,
      icon: AlertTriangle,
      colorCls: "bg-rose-500/10 text-rose-500 dark:bg-rose-500/15",
    },
    {
      title: "Registado em",
      value: convertData(processo.createdAt),
      icon: Clock,
      colorCls: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/15",
    },
  ];
}

/* ─── page ────────────────────────────────────────────────────────────── */

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const processo = await getProcessoById(id);
  const metrics = getMetrics(processo as unknown as ProcessoItem);
  const statusVariant = getBageEstadoProcesso(processo.estadoProcesso) as
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | null
    | undefined;

  return (
    <main className="bg-background">
      <div className="flex flex-col gap-6">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          {/* Top: title + status panels */}
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:justify-between lg:p-8">
            {/* Left — identity */}
            <div className="min-w-0 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="gap-1.5 text-[10px] uppercase tracking-[.25em] text-muted-foreground"
                >
                  <Gavel className="h-3 w-3" />
                  Dossier Criminal
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-[10px] uppercase tracking-[.25em]"
                >
                  Em instrução
                </Badge>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                  Nº do processo
                </p>
                <h1 className="font-mono text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {processo.numero}
                </h1>
              </div>

              {processo.descricao && (
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {processo.descricao}
                </p>
              )}
            </div>

            {/* Right — status + updated */}
            <div className="flex shrink-0 flex-row gap-3 sm:flex-row lg:w-56 lg:flex-col">
              <div className="flex-1 rounded-xl border border-border/60 bg-muted/40 p-4 dark:bg-muted/20">
                <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-muted-foreground">
                  Status do processo
                </p>
                <div className="mt-3">
                  <Badge
                    variant={statusVariant ?? "secondary"}
                    className="text-xs font-semibold uppercase tracking-wide"
                  >
                    {convertEstadoProcessoToNormalCase(
                      processo.estadoProcesso,
                    ) ?? "—"}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 rounded-xl border border-border/60 bg-muted/40 p-4 dark:bg-muted/20">
                <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-muted-foreground">
                  Última atualização
                </p>
                <p className="mt-3 font-mono text-sm font-semibold text-foreground">
                  {convertData(processo.updatedAt ?? processo.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Metrics strip */}
          <div className="grid grid-cols-2 divide-x divide-y divide-border/50 border-t border-border/60 xl:grid-cols-4 xl:divide-y-0">
            {metrics.map(({ title, value, icon: Icon, colorCls }) => (
              <div
                key={title}
                className="flex items-center gap-4 p-5 transition-colors hover:bg-muted/30"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorCls}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                    {title}
                  </p>
                  <p className="mt-0.5 truncate text-base font-semibold text-foreground">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Content grid ──────────────────────────────────────────────── */}
        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          {/* Dados do processo */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Dados do processo</CardTitle>
              <CardDescription>
                Todos os detalhes essenciais do arquivo e da matéria.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 pt-6 sm:grid-cols-2">
              <InfoField
                label="Número do processo"
                value={processo.numero}
                icon={Hash}
                mono
              />
              <InfoField
                label="Nome / Designação"
                value={
                  <span className="text-sm text-muted-foreground italic">
                    {processo.descricao || "—"}
                  </span>
                }
                icon={Tag}
              />
              <InfoField
                label="Tipo de processo"
                value={
                  <Badge
                    variant="secondary"
                    className="text-xs font-semibold uppercase tracking-wide"
                  >
                    {mapTipoProcesso(processo.tipoProcesso)}
                  </Badge>
                }
                icon={FileText}
              />
              <InfoField
                label="Ano judicial"
                value={processo.ano}
                icon={Calendar}
                mono
              />
            </CardContent>
          </Card>

          {/* Crimes imputados */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Crimes imputados</CardTitle>
              <CardDescription>
                Resumo das infrações registradas neste processo.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {processo.crimes.length === 0 ? (
                <p className="text-sm text-muted-foreground italic py-4 text-center">
                  Nenhum crime registado neste processo.
                </p>
              ) : (
                <ul className="space-y-3">
                  {processo.crimes.map((crime, index) => (
                    <li
                      key={crime.id}
                      className="group flex items-start gap-3 rounded-xl border border-border/60 bg-muted/40 p-4 transition-colors hover:bg-muted/60 dark:bg-muted/20 dark:hover:bg-muted/30"
                    >
                      {/* Index badge */}
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 font-mono text-xs font-bold text-rose-500 dark:bg-rose-500/15">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold leading-snug text-foreground">
                            {getCrimeTexto(crime.descricao)}
                          </p>
                          <Badge
                            variant="outline"
                            className="shrink-0 text-[10px] uppercase"
                          >
                            {crime.artigoPenal}
                          </Badge>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {crime.artigoPenal} do Código Penal
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
