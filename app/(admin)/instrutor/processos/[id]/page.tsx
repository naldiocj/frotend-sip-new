import { getProcessoById } from "@/app/services/processo.service";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  convertData,
  convertEstadoProcessoToNormalCase,
  toUpperCase,
} from "@/lib/date-utils";
import { ProcessoItem } from "@/lib/dto/processo.dto";
import { getCrimeTexto } from "@/lib/utils";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  FolderOpen,
  Gavel,
  Hash,
  Scale,
  Tag,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const processo = {
  numero: "235/525-PGR-AE",
  tipologia: "Normal",
  anoJudicial: "2026",
  registadoEm: "18/03/2026",
  estado: "Em Instrução",
  nomeDesignacao: "Não atribuído",
  descricaoMateria: "900KUUBBUUUUUBU",
  crimes: [
    { nome: "Corrupção Ativa", artigo: "Art. 362°", gravidade: 3 },
    { nome: "Burla", artigo: "Art. 417°", gravidade: 2 },
    { nome: "Abuso de Poder", artigo: "Art. 374°", gravidade: 4 },
  ],
  cronologia: [
    {
      data: "18/03/2026",
      titulo: "Abertura do dossier",
      descricao: "Processo registado no sistema PGR-AE. Instrução iniciada.",
      ativo: true,
    },
    {
      data: "Pendente",
      titulo: "Recolha de provas",
      descricao: "Diligências de investigação em curso.",
      ativo: false,
    },
    {
      data: "—",
      titulo: "Conclusão da instrução",
      descricao: "A aguardar despacho final.",
      ativo: false,
    },
  ],
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function GravidadeIndicator({ nivel }: { nivel: number }) {
  const labels: Record<number, string> = {
    1: "Leve",
    2: "Moderado",
    3: "Grave",
    4: "Muito grave",
    5: "Crítico",
  };
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${i < nivel ? "bg-red-500" : "bg-muted"
              }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">{labels[nivel]}</span>
    </div>
  );
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
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium text-muted-foreground uppercase flex items-center gap-1.5">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </p>
      <div
        className={`text-sm font-medium ${mono ? "font-mono bg-muted px-2 py-0.5 rounded w-fit" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}

interface PageProps {
  params: Promise<{ id: string }>;
}

function cards(processo: ProcessoItem) {
  return [
    {
      label: "Tipologia",
      value: processo.tipoProcesso,
      icon: Tag,
      mono: false,
      bg: "bg-violet-100",
    },
    {
      label: "Ano judicial",
      value: processo.ano,
      icon: Calendar,
      mono: true,
      bg: "bg-emerald-100",
    },
    {
      label: "Crimes imputados",
      value: processo.crimes.length,
      icon: AlertTriangle,
      mono: true,
      bg: "bg-rose-100",
    },
    {
      label: "Registado em",
      value: convertData(processo.createdAt),
      icon: Clock,
      mono: true,
      bg: "bg-amber-100",
    },
  ];
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const processo = await getProcessoById(id);

  return (
    <div className="bg-background">
      <div className="px-4 py-8 space-y-6">
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-800 border-amber-300 font-semibold text-[11px] uppercase tracking-wide"
              >
                <Gavel className="h-3 w-3 mr-1" />
                Dossier Criminal
              </Badge>
              <Badge
                variant="secondary"
                className="text-[11px] uppercase tracking-wide"
              >
                Em instrução
              </Badge>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground uppercase mb-1">
                Nº do processo
              </p>
              <h1 className="text-3xl font-bold tracking-tight font-mono">
                {processo.numero}
              </h1>
            </div>
          </div>
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cards(processo).map(({ label, value, icon: Icon, mono, bg }) => (
            <Card key={label} className={`border-border/60 ${bg}`}>
              <CardContent className="pt-4 pb-3 px-4 space-y-1.5">
                <p className="text-[11px] text-muted-foreground dark:text-blue-800 uppercase flex items-center gap-1.5">
                  <Icon className="h-3 w-3" />
                  {label}
                </p>
                <div
                  className={`text-base dark:text-black font-semibold ${mono ? "font-mono" : ""}`}
                >
                  {value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Dados do processo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField
                label="Número do processo"
                value={processo.numero}
                icon={Hash}
                mono
              />
              <InfoField
                label="Nome / Designação"
                value={
                  <span className="text-muted-foreground italic">
                    {processo.descricao}
                  </span>
                }
                icon={Tag}
              />
              <InfoField
                label="Tipo de processo"
                value={
                  <Badge variant="secondary" className="text-xs font-medium">
                    {toUpperCase(processo.tipoProcesso)}
                  </Badge>
                }
                icon={FileText}
              />
              <InfoField
                label="Estado"
                value={
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 border text-xs font-medium">
                    {toUpperCase(
                      convertEstadoProcessoToNormalCase(
                        processo.estadoProcesso,
                      ),
                    )}
                  </Badge>
                }
                icon={CheckCircle2}
              />
              <InfoField
                label="Ano judicial"
                value={processo.ano}
                icon={Calendar}
                mono
              />
              <InfoField
                label="Descrição / Matéria"
                value={processo.descricao}
                icon={FileText}
                mono
              />
            </div>

            <Separator />

            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase mb-4 flex items-center gap-1.5">
                <Scale className="h-3 w-3" />
                Crimes imputados
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {processo.crimes.map((crime, i) => (
                  <div
                    key={crime.id}
                    className="rounded-lg border border-border/60 p-4 space-y-1"
                  >
                    <p className="text-[10px] font-medium text-muted-foreground uppercase">
                      Crime {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-sm font-semibold">
                      {getCrimeTexto(crime.descricao)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {crime.artigoPenal} do Código Penal
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
