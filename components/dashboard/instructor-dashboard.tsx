import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getProcessos } from "@/app/services/processo.service";
import { ProcessoListItem } from "@/lib/dto/processo.dto";

function formatStatusLabel(status: string | null) {
  switch (status) {
    case "EM_INSTRUCAO":
      return "Em instrução";
    case "ARQUIVADO":
      return "Arquivado";
    case "REMETIDO_JUIZO":
      return "Remetido ao Juízo";
    case "REMETIDO_PGR":
      return "Remetido ao PGR";
    case "TRAMITADO":
      return "Tramitado";
    case "SENTENCIADO":
      return "Sentenciado";
    default:
      return "Sem estado";
  }
}

function formatStatusVariant(status: string | null) {
  switch (status) {
    case "EM_INSTRUCAO":
      return "secondary";
    case "REMETIDO_JUIZO":
    case "REMETIDO_PGR":
      return "default";
    case "SENTENCIADO":
      return "destructive";
    default:
      return "outline";
  }
}

export async function InstructorDashboard() {
  const processos = await getProcessos();

  const totalProcessos = processos.length;
  const processosEmInstrucao = processos.filter(
    (processo) => processo.estadoProcesso === "EM_INSTRUCAO",
  ).length;
  const processosPendentes = processos.filter(
    (processo) =>
      processo.estadoProcesso === "TRAMITADO" ||
      processo.estadoProcesso === "EM_INSTRUCAO",
  ).length;
  const processosComDetidos = processos.filter(
    (processo) => processo.tipoProcesso === "COM_DETIDO",
  ).length;

  const recentCases = processos
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 3)
    .map((processo) => ({
      id: processo.id,
      num: processo.numero,
      crime: processo.crimes?.[0]?.descricao || "Sem crime definido",
      status: formatStatusLabel(processo.estadoProcesso),
      statusVariant: formatStatusVariant(processo.estadoProcesso),
      data: processo.updatedAt,
    }));

  const instructorStats = [
    {
      title: "Meus Processos",
      value: String(totalProcessos),
      description: "Processos atribuídos ao instrutor",
      icon: FileText,
      color:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    },
    {
      title: "Em Instrução",
      value: String(processosEmInstrucao),
      description: "Processos em curso",
      icon: Calendar,
      color:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    },
    {
      title: "Relatórios Pendentes",
      value: String(processosPendentes),
      description: "Aguardando encaminhamento ou revisão",
      icon: Clock,
      color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    },
    {
      title: "Com detido",
      value: String(processosComDetidos),
      description: "Processos com detido em custódia",
      icon: CheckCircle2,
      color:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    },
  ];

  const pendingTasks = processos
    .filter((processo) => processo.estadoProcesso === "EM_INSTRUCAO")
    .slice(0, 5)
    .map((processo) => ({
      id: processo.id,
      title: `Revisar ${processo.numero}`,
      subtitle: processo.descricao || processo.numero,
      due: "Hoje",
      icon: AlertCircle,
      color: "bg-amber-500/10 text-amber-500",
    }));

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {instructorStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="border-none shadow-md hover:shadow-lg transition-all duration-200"
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Active Cases */}
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Meus Processos Recentes</CardTitle>
              <CardDescription>
                Acompanhamento das últimas investigações
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
            >
              Ver todos <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-muted/50">
                  <TableHead className="font-semibold">Nº Processo</TableHead>
                  <TableHead className="font-semibold">Crime</TableHead>
                  <TableHead className="font-semibold">Estado</TableHead>
                  <TableHead className="font-semibold">
                    Última Atualiz.
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCases.map((c) => (
                  <TableRow key={c.id} className="border-muted/50">
                    <TableCell className="font-medium text-primary/90">
                      {c.num}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {c.crime}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={c.statusVariant as any}
                        className="font-medium"
                      >
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-medium">
                      {new Date(c.data).toLocaleDateString("pt-PT")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pending Tasks / Deadlines */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Tarefas Pendentes
            </CardTitle>
            <CardDescription>Diligências e prazos próximos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted transition-colors cursor-pointer border border-transparent hover:border-muted-foreground/10"
                  >
                    <div className={`mt-1 ${task.color} p-1.5 rounded-full`}>
                      <task.icon className="h-3 w-3" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold tracking-tight">
                        {task.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase mt-0.5">
                        {task.subtitle}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 rounded">
                      {task.due}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Sem tarefas pendentes no momento.
                </p>
              )}
            </div>
            <Button
              className="w-full mt-6 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary transition-all border-none"
              variant="outline"
            >
              Gerir Agenda
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
