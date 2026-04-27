"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Clock,
  Archive,
  Send,
  Gavel,
  Ban,
  UserRound,
  Scale,
  Eye,
  Briefcase,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  History,
  Target,
  Package,
  Bell,
  FileSignature,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = {
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  blue: "#3b82f6",
  indigo: "#6366f1",
  cyan: "#06b6d4",
  gray: "#6b7280",
};

function formatStatusLabel(status: string | null) {
  switch (status) {
    case "EM_INSTRUCAO":
      return "Em Instrução";
    case "ARQUIVADO":
      return "Arquivado";
    case "REMETIDO_JUIZO":
      return "Remetido Juízo";
    case "REMETIDO_PGR":
      return "Remetido PGR";
    case "TRAMITADO":
      return "Tramitado";
    case "SENTENCIADO":
      return "Sentenciado";
    default:
      return "Desconhecido";
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
  });
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
  trendUp,
}: {
  title: string;
  value: number;
  icon: any;
  color: string;
  trend?: string;
  trendUp?: boolean;
}) {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-all duration-200">
      <CardContent className="pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider truncate">
              {title}
            </p>
            <h3 className="text-xl font-bold mt-0.5">{value}</h3>
            {trend && (
              <div className="flex items-center gap-1 mt-0.5">
                {trendUp ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-rose-500" />
                )}
                <span className="text-[9px] text-muted-foreground">
                  {trend}
                </span>
              </div>
            )}
          </div>
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProcessosAreaChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
        Sem dados suficientes
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorProcessos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.indigo} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS.indigo} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
        <YAxis stroke="#9ca3af" fontSize={10} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Area
          type="monotone"
          dataKey="Processos"
          stroke={COLORS.indigo}
          fillOpacity={1}
          fill="url(#colorProcessos)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function StatusPieChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
        Sem dados
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={Object.values(COLORS)[index % Object.values(COLORS).length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function TipoBarChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
        Sem dados
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
        <YAxis stroke="#9ca3af" fontSize={10} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Bar dataKey="value" fill={COLORS.emerald} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface DashboardProps {
  processos?: any[];
  queixosos?: any[];
  arguidos?: any[];
  testemunhas?: any[];
  advogados?: any[];
  mandatos?: any[];
  despachos?: any[];
  remessas?: any[];
  notificacoes?: any[];
}

export function InstructorDashboard({
  processos = [],
  queixosos = [],
  arguidos = [],
  testemunhas = [],
  advogados = [],
  mandatos = [],
  despachos = [],
  remessas = [],
  notificacoes = [],
}: DashboardProps) {
  const totalProcessos = processos.length;
  const processosEmInstrucao = processos.filter(
    (p) => p.estadoProcesso === "EM_INSTRUCAO",
  ).length;
  const processosArquivados = processos.filter(
    (p) => p.estadoProcesso === "ARQUIVADO",
  ).length;
  const processosRemetidosJuizo = processos.filter(
    (p) => p.estadoProcesso === "REMETIDO_JUIZO",
  ).length;
  const processosRemetidosPGR = processos.filter(
    (p) => p.estadoProcesso === "REMETIDO_PGR",
  ).length;
  const processosSentenciados = processos.filter(
    (p) => p.estadoProcesso === "SENTENCIADO",
  ).length;
  const processosTramitados = processos.filter(
    (p) => p.estadoProcesso === "TRAMITADO",
  ).length;
  const processosComDetido = processos.filter(
    (p) => p.tipoProcesso === "COM_DETIDO",
  ).length;
  const processosTipoNormal = processos.filter(
    (p) => p.tipoProcesso === "NORMAL",
  ).length;
  const processosTipoAveriguacao = processos.filter(
    (p) => p.tipoProcesso === "AVERIGUACAO",
  ).length;

  const totalQueixosos = queixosos?.length || 0;
  const totalArguidos = arguidos?.length || 0;
  const totalTestemunhas = testemunhas?.length || 0;
  const totalAdvogados = advogados?.length || 0;

  const totalMandados = mandatos?.length || 0;
  const mandatosPendentes = mandatos?.filter((m: any) => m.estado === "PENDENTE").length || 0;
  const mandatosEmExecucao = mandatos?.filter((m: any) => m.estado === "EM_EXECUCAO").length || 0;
  const mandatosCumpridos = mandatos?.filter((m: any) => m.estado === "CUMPRIDO").length || 0;
  const mandatosCancelados = mandatos?.filter((m: any) => m.estado === "CANCELADO").length || 0;

  const totalDespachos = despachos?.length || 0;
  const despachosFinalizados = despachos?.filter((d: any) => d.isFinalizado).length || 0;
  const despachosPendentes = despachos?.filter((d: any) => !d.isFinalizado).length || 0;

  const totalRemessas = remessas?.length || 0;
  const remessasRecebidas = remessas?.filter((r: any) => r.status === "RECEBIDO").length || 0;
  const remessasEmTransito = remessas?.filter((r: any) => r.status === "EM_TRANSITO").length || 0;
  const remessasPendentes = remessas?.filter((r: any) => r.status === "PENDENTE").length || 0;

  const totalNotificacoes = notificacoes?.length || 0;
  const notificacoesNaoLidas = notificacoes?.filter((n: any) => !n.lida).length || 0;
  const notificacoesNaoLidasPorTipo = {
    INFO: notificacoes?.filter((n: any) => !n.lida && n.tipo === "INFO").length || 0,
    AVISO: notificacoes?.filter((n: any) => !n.lida && n.tipo === "AVISO").length || 0,
    URGENTE: notificacoes?.filter((n: any) => !n.lida && n.tipo === "URGENTE").length || 0,
    SUCESSO: notificacoes?.filter((n: any) => !n.lida && n.tipo === "SUCESSO").length || 0,
  };

  const recentCases = processos
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      num: p.numero,
      crime: p.crimes?.[0]?.descricao || "Sem crime",
      status: formatStatusLabel(p.estadoProcesso),
      data: p.updatedAt,
      tipo: p.tipoProcesso,
    }));

  const statusStats = [
    { name: "Em Instrução", value: processosEmInstrucao },
    { name: "Arquivados", value: processosArquivados },
    { name: "Remetido Juízo", value: processosRemetidosJuizo },
    { name: "Remetido PGR", value: processosRemetidosPGR },
    { name: "Tramitados", value: processosTramitados },
    { name: "Sentenciados", value: processosSentenciados },
  ];

  const tipoStats = [
    { name: "Normal", value: processosTipoNormal },
    { name: "Com Detido", value: processosComDetido },
    { name: "Averiguação", value: processosTipoAveriguacao },
  ];

  const evolucaoData = processos.reduce((acc: any, p) => {
    const mes = formatDate(p.createdAt);
    acc[mes] = (acc[mes] || 0) + 1;
    return acc;
  }, {});

  const evolucaoChartData = Object.entries(evolucaoData).map(
    ([name, value]) => ({
      name,
      Processos: value,
    }),
  );

  const mandatoStats = [
    { name: "Pendentes", value: mandatosPendentes },
    { name: "Em Execução", value: mandatosEmExecucao },
    { name: "Cumpridos", value: mandatosCumpridos },
    { name: "Cancelados", value: mandatosCancelados },
  ];

  const remessaStats = [
    { name: "Recebidas", value: remessasRecebidas },
    { name: "Em Trânsito", value: remessasEmTransito },
    { name: "Pendentes", value: remessasPendentes },
  ];

  const notificacaoStats = [
    { name: "Lidas", value: totalNotificacoes - notificacoesNaoLidas },
    { name: "Não Lidas", value: notificacoesNaoLidas },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          title="Processos"
          value={totalProcessos}
          icon={FileText}
          color="bg-indigo-100 text-indigo-700"
          trend="+12%"
          trendUp
        />
        <StatCard
          title="Em Instrução"
          value={processosEmInstrucao}
          icon={Clock}
          color="bg-amber-100 text-amber-700"
          trend="+5%"
          trendUp
        />
        <StatCard
          title="Arquivados"
          value={processosArquivados}
          icon={Archive}
          color="bg-gray-100 text-gray-700"
          trend="+2%"
          trendUp
        />
        <StatCard
          title="Remetidos"
          value={processosRemetidosJuizo + processosRemetidosPGR}
          icon={Send}
          color="bg-blue-100 text-blue-700"
          trend="+8%"
          trendUp
        />
        <StatCard
          title="Sentenciados"
          value={processosSentenciados}
          icon={Gavel}
          color="bg-rose-100 text-rose-700"
          trend="+3%"
          trendUp
        />
        <StatCard
          title="Com Detido"
          value={processosComDetido}
          icon={Ban}
          color="bg-red-100 text-red-700"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Mandados"
          value={totalMandados}
          icon={Scale}
          color="bg-cyan-100 text-cyan-700"
          trend="+15%"
          trendUp
        />
        <StatCard
          title="Pendentes"
          value={mandatosPendentes}
          icon={Clock}
          color="bg-amber-100 text-amber-700"
        />
        <StatCard
          title="Em Execução"
          value={mandatosEmExecucao}
          icon={Activity}
          color="bg-blue-100 text-blue-700"
        />
        <StatCard
          title="Cumpridos"
          value={mandatosCumpridos}
          icon={CheckCircle2}
          color="bg-emerald-100 text-emerald-700"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Despachos" value={totalDespachos} icon={FileSignature} color="bg-indigo-100 text-indigo-700" />
        <StatCard title="Finalizados" value={despachosFinalizados} icon={CheckCircle2} color="bg-emerald-100 text-emerald-700" />
        <StatCard title="Remessas" value={totalRemessas} icon={Package} color="bg-orange-100 text-orange-700" />
        <StatCard title="Não Lidas" value={notificacoesNaoLidas} icon={Bell} color="bg-rose-100 text-rose-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <History className="h-4 w-4 text-primary" />
              Evolução de Processos
            </CardTitle>
            <CardDescription>Processos criados por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ProcessosAreaChart data={evolucaoChartData} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Distribuição por Tipo
            </CardTitle>
            <CardDescription>Processos por tipo</CardDescription>
          </CardHeader>
          <CardContent>
            <TipoBarChart data={tipoStats} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Estado dos Processos
            </CardTitle>
            <CardDescription>Distribuição por estado</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusPieChart data={statusStats} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <UserRound className="h-4 w-4 text-primary" />
              Participantes
            </CardTitle>
            <CardDescription>Total registado no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <UserRound className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Queixosos</p>
                    <p className="text-xs text-muted-foreground">registados</p>
                  </div>
                </div>
                <span className="text-xl font-bold">{totalQueixosos}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/50">
                    <Scale className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Arguidos</p>
                    <p className="text-xs text-muted-foreground">
                      identificados
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold">{totalArguidos}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                    <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Testemunhas</p>
                    <p className="text-xs text-muted-foreground">cadastradas</p>
                  </div>
                </div>
                <span className="text-xl font-bold">{totalTestemunhas}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                    <Briefcase className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Advogados</p>
                    <p className="text-xs text-muted-foreground">registados</p>
                  </div>
                </div>
                <span className="text-xl font-bold">{totalAdvogados}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Scale className="h-4 w-4 text-cyan-600" />
              Mandados
            </CardTitle>
            <CardDescription>Distribuição por estado</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusPieChart data={mandatoStats} />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4 text-orange-600" />
              Remessas
            </CardTitle>
            <CardDescription>Status das remessas</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusPieChart data={remessaStats} />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-rose-600" />
              Notificações
            </CardTitle>
            <CardDescription>Não lidas por tipo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
                <span className="text-sm font-medium">Info</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {notificacoesNaoLidasPorTipo.INFO}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900">
                <span className="text-sm font-medium">Aviso</span>
                <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                  {notificacoesNaoLidasPorTipo.AVISO}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900">
                <span className="text-sm font-medium">Urgente</span>
                <Badge variant="outline" className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                  {notificacoesNaoLidasPorTipo.URGENTE}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
                <span className="text-sm font-medium">Sucesso</span>
                <Badge variant="outline" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  {notificacoesNaoLidasPorTipo.SUCESSO}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Processos Recentes</CardTitle>
              <CardDescription>Últimas actualizações</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              Ver todos <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-muted/50">
                  <TableHead className="font-semibold">Nº Processo</TableHead>
                  <TableHead className="font-semibold">Tipo</TableHead>
                  <TableHead className="font-semibold">Crime</TableHead>
                  <TableHead className="font-semibold">Estado</TableHead>
                  <TableHead className="font-semibold text-right">
                    Data
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCases.map((c) => (
                  <TableRow key={c.id} className="border-muted/50">
                    <TableCell className="font-medium text-primary/90">
                      {c.num}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">
                        {c.tipo || "NORMAL"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium max-w-[200px] truncate">
                      {c.crime}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px]">
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-medium text-right">
                      {formatDate(c.data)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Acções Urgentes
            </CardTitle>
            <CardDescription>Requerem atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {processosEmInstrucao > 0 && (
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {processosEmInstrucao} processos em instrução
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Requerem conclusão
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {processosComDetido > 0 && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-3">
                    <Ban className="h-4 w-4 text-red-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {processosComDetido} com detido
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Urgente conclusão
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {processosRemetidosJuizo > 0 && (
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <Send className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {processosRemetidosJuizo} remetidos ao juízo
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Aguardando resposta
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {processosRemetidosPGR > 0 && (
                <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-center gap-3">
                    <Send className="h-4 w-4 text-indigo-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {processosRemetidosPGR} remetidos ao PGR
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Aguardando parecer
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {processosEmInstrucao === 0 &&
                processosComDetido === 0 &&
                processosRemetidosJuizo === 0 && (
                  <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                      Tudo em dia!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sem tarefas urgentes
                    </p>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
