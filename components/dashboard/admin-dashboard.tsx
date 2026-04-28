"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
  LineChart,
  Line,
} from "recharts";
import {
  FileText,
  Users,
  Layers,
  FolderTree,
  LayoutDashboard,
  Box,
  Scale,
  Clock,
  Activity,
  CheckCircle2,
  Package,
  Bell,
  AlertTriangle,
  UserRound,
  Briefcase,
  Eye,
  Gavel,
  TrendingUp,
  TrendingDown,
  Archive,
  Send,
} from "lucide-react";

const COLORS = {
  blue: "#3b82f6",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#ef4444",
  violet: "#8b5cf6",
  cyan: "#06b6d4",
  orange: "#f97316",
  purple: "#a855f7",
  pink: "#ec4899",
  indigo: "#6366f1",
};

const CHART_COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#a855f7",
];

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
  description,
}: {
  title: string;
  value: number;
  icon: any;
  color: string;
  trend?: string;
  trendUp?: boolean;
  description?: string;
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
                <span className="text-[9px] text-muted-foreground">{trend}</span>
              </div>
            )}
            {description && (
              <p className="text-[9px] text-muted-foreground mt-1">{description}</p>
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

function CustomPieChart({
  data,
  title,
}: {
  data: { name: string; value: number }[];
  title: string;
}) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
        Sem dados
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={75}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            color: "#1f2937",
            fontSize: "12px",
            fontWeight: 500,
          }}
          itemStyle={{ color: "#1f2937", fontWeight: 500 }}
          formatter={(value, name) => [`${value} (${total > 0 ? Math.round((Number(value) / total) * 100) : 0}%)`, name]}
          labelFormatter={(label) => `${label}`}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => (
            <span className="text-xs text-foreground font-medium">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function CustomBarChart({
  data,
  title,
  color = COLORS.emerald,
}: {
  data: { name: string; value: number }[];
  title: string;
  color?: string;
}) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
        Sem dados
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
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
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomAreaChart({
  data,
  title,
  color = COLORS.blue,
}: {
  data: { name: string; value: number }[];
  title: string;
  color?: string;
}) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
        Sem dados suficientes
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`color${title.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
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
          dataKey="value"
          stroke={color}
          fillOpacity={1}
          fill={`url(#color${title.replace(/\s/g, "")})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomLineChart({
  data,
  title,
  color = COLORS.violet,
}: {
  data: { name: string; value: number }[];
  title: string;
  color?: string;
}) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
        Sem dados
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
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
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface DashboardProps {
  processos?: any[];
  usuarios?: any[];
  categorias?: any[];
  direccoes?: any[];
  patentes?: any[];
  tiposCrimes?: any[];
  mandatos?: any[];
  notificacoes?: any[];
  remessas?: any[];
  despachos?: any[];
  detidos?: any[];
  diligencias?: any[];
}

export function AdminDashboard({
  processos = [],
  usuarios = [],
  categorias = [],
  direccoes = [],
  patentes = [],
  tiposCrimes = [],
  mandatos = [],
  notificacoes = [],
  remessas = [],
  despachos = [],
  detidos = [],
  diligencias = [],
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

  const totalUsuarios = usuarios.length;
  const usuariosAtivos = usuarios.filter((u: any) => u.ativo).length;
  const usuariosInativos = usuarios.filter((u: any) => !u.ativo).length;

  const totalCategorias = categorias.length;
  const totalDireccoes = direccoes.length;
  const totalPatentes = patentes.length;
  const totalTiposCrimes = tiposCrimes.length;

  const totalMandados = mandatos.length;
  const mandatosPendentes = mandatos.filter(
    (m: any) => m.estado === "PENDENTE",
  ).length;
  const mandatosEmExecucao = mandatos.filter(
    (m: any) => m.estado === "EM_EXECUCAO",
  ).length;
  const mandatosCumpridos = mandatos.filter(
    (m: any) => m.estado === "CUMPRIDO",
  ).length;
  const mandatosCancelados = mandatos.filter(
    (m: any) => m.estado === "CANCELADO",
  ).length;

  const totalRemessas = remessas.length;
  const remessasRecebidas = remessas.filter(
    (r: any) => r.status === "RECEBIDO",
  ).length;
  const remessasEmTransito = remessas.filter(
    (r: any) => r.status === "EM_TRANSITO",
  ).length;
  const remessasPendentes = remessas.filter(
    (r: any) => r.status === "PENDENTE",
  ).length;

  const totalDespachos = despachos.length;
  const despachosFinalizados = despachos.filter((d: any) => d.isFinalizado).length;
  const despachosPendentes = despachos.filter((d: any) => !d.isFinalizado).length;

  const totalNotificacoes = notificacoes.length;
  const notificacoesLidas = notificacoes.filter((n: any) => n.lida).length;
  const notificacoesNaoLidas = notificacoes.filter((n: any) => !n.lida).length;

  const totalDetidos = detidos.length;
  const detidosAtivos = detidos.filter((d: any) => d.ativo).length;

  const totalDiligencias = diligencias.length;
  const diligenciasConcluidas = diligencias.filter(
    (d: any) => d.estado === "CONCLUIDA",
  ).length;
  const diligenciasPendentes = diligencias.filter(
    (d: any) => d.estado === "PENDENTE",
  ).length;

  const processTypeStats = [
    { name: "Normal", value: processosTipoNormal },
    { name: "Com Detido", value: processosComDetido },
    { name: "Averiguação", value: processosTipoAveriguacao },
  ].filter((item) => item.value > 0);

  if (processTypeStats.length === 0) {
    processTypeStats.push({ name: "Sem processos", value: 1 });
  }

  const processStatusStats = [
    { name: "Em Instrução", value: processosEmInstrucao },
    { name: "Arquivados", value: processosArquivados },
    { name: "Remetido Juízo", value: processosRemetidosJuizo },
    { name: "Remetido PGR", value: processosRemetidosPGR },
    { name: "Tramitados", value: processosTramitados },
    { name: "Sentenciados", value: processosSentenciados },
  ].filter((item) => item.value > 0);

  if (processStatusStats.length === 0) {
    processStatusStats.push({ name: "Sem processos", value: 1 });
  }

  const mandatoStats = [
    { name: "Pendentes", value: mandatosPendentes },
    { name: "Em Execução", value: mandatosEmExecucao },
    { name: "Cumpridos", value: mandatosCumpridos },
    { name: "Cancelados", value: mandatosCancelados },
  ].filter((item) => item.value > 0);

  if (mandatoStats.length === 0) {
    mandatoStats.push({ name: "Sem mandatos", value: 1 });
  }

  const remessaStats = [
    { name: "Recebidas", value: remessasRecebidas },
    { name: "Em Trânsito", value: remessasEmTransito },
    { name: "Pendentes", value: remessasPendentes },
  ].filter((item) => item.value > 0);

  if (remessaStats.length === 0) {
    remessaStats.push({ name: "Sem remessas", value: 1 });
  }

  const userRoleStats = usuarios.reduce((acc: any, u: any) => {
    const role = u.role || "SEM_ROLE";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  const userRoleStatsArray = Object.entries(userRoleStats).map(([name, value]) => ({
    name,
    value: Number(value),
  }));

  if (userRoleStatsArray.length === 0) {
    userRoleStatsArray.push({ name: "Sem utilizadores", value: 1 });
  }

  const evolucaoData = processos.reduce((acc: any, p) => {
    const mes = formatDate(p.createdAt);
    acc[mes] = (acc[mes] || 0) + 1;
    return acc;
  }, {});

  const evolucaoChartData = Object.entries(evolucaoData)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([name, value]) => ({
      name,
      value: Number(value),
    }));

  const direcaoStats = direccoes.map((d: any) => ({
    name: d.sigla || d.nome?.substring(0, 10) || "Sem nome",
    value: processos.filter((p: any) => p.direcaoId === d.id).length,
  }));

  const tipoCrimeStats = tiposCrimes.slice(0, 10).map((t: any) => ({
    name: t.descricao?.substring(0, 15) || "Sem crime",
    value: processos.filter(
      (p: any) => p.crimes?.some((c: any) => c.tipoCrimeId === t.id),
    ).length,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <StatCard
          title="Processos"
          value={totalProcessos}
          icon={FileText}
          color="bg-blue-100 text-blue-700"
          trend="+12%"
          trendUp
          description="Total no sistema"
        />
        <StatCard
          title="Em Instrução"
          value={processosEmInstrucao}
          icon={Clock}
          color="bg-amber-100 text-amber-700"
          description="Processes em análise"
        />
        <StatCard
          title="Arquivados"
          value={processosArquivados}
          icon={Archive}
          color="bg-gray-100 text-gray-700"
        />
        <StatCard
          title="Remetidos"
          value={processosRemetidosJuizo + processosRemetidosPGR}
          icon={Send}
          color="bg-indigo-100 text-indigo-700"
        />
        <StatCard
          title="Sentenciados"
          value={processosSentenciados}
          icon={Gavel}
          color="bg-rose-100 text-rose-700"
        />
        <StatCard
          title="Com Detido"
          value={processosComDetido}
          icon={AlertTriangle}
          color="bg-red-100 text-red-700"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatCard
          title="Utilizadores"
          value={totalUsuarios}
          icon={Users}
          color="bg-cyan-100 text-cyan-700"
          description="Cadastrados"
        />
        <StatCard
          title="Ativos"
          value={usuariosAtivos}
          icon={CheckCircle2}
          color="bg-emerald-100 text-emerald-700"
        />
        <StatCard
          title="Inativos"
          value={usuariosInativos}
          icon={Clock}
          color="bg-amber-100 text-amber-700"
        />
        <StatCard
          title="Tipos Crime"
          value={totalTiposCrimes}
          icon={Layers}
          color="bg-violet-100 text-violet-700"
        />
        <StatCard
          title="Patentes"
          value={totalPatentes}
          icon={FolderTree}
          color="bg-orange-100 text-orange-700"
        />
        <StatCard
          title="Direções"
          value={totalDireccoes}
          icon={LayoutDashboard}
          color="bg-purple-100 text-purple-700"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatCard title="Categorias" value={totalCategorias} icon={Box} color="bg-pink-100 text-pink-700" />
        <StatCard
          title="Mandados"
          value={totalMandados}
          icon={Scale}
          color="bg-sky-100 text-sky-700"
        />
        <StatCard
          title="Pendentes"
          value={mandatosPendentes}
          icon={Clock}
          color="bg-amber-100 text-amber-700"
        />
        <StatCard
          title="Cumpridos"
          value={mandatosCumpridos}
          icon={CheckCircle2}
          color="bg-emerald-100 text-emerald-700"
        />
        <StatCard
          title="Detidos"
          value={totalDetidos}
          icon={UserRound}
          color="bg-red-100 text-red-700"
        />
        <StatCard
          title="Notificações"
          value={totalNotificacoes}
          icon={Bell}
          color="bg-violet-100 text-violet-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Evolução de Processos
            </CardTitle>
            <CardDescription>Processos criados por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomAreaChart
              data={evolucaoChartData}
              title="Evolução"
              color={COLORS.blue}
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              Distribuição por Tipo
            </CardTitle>
            <CardDescription>Tipos de processos</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomPieChart data={processTypeStats} title="Tipos" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Scale className="h-4 w-4 text-cyan-600" />
              Estado dos Processos
            </CardTitle>
            <CardDescription>Distribuição por estado</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomPieChart data={processStatusStats} title="Estado" />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Utilizadores por Função
            </CardTitle>
            <CardDescription>Distribuição por role</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomPieChart data={userRoleStatsArray} title="Funções" />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4 text-orange-600" />
              Mandados
            </CardTitle>
            <CardDescription>Estado dos mandatos</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomPieChart data={mandatoStats} title="Mandados" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-emerald-600" />
              Processos por Direção
            </CardTitle>
            <CardDescription>Quantidade por direção</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomBarChart
              data={direcaoStats}
              title="Direções"
              color={COLORS.emerald}
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="h-4 w-4 text-violet-600" />
              Crimes por Tipo
            </CardTitle>
            <CardDescription>Quantidade por tipo de crime</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomBarChart
              data={tipoCrimeStats}
              title="Crimes"
              color={COLORS.violet}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4 text-amber-600" />
              Remessas
            </CardTitle>
            <CardDescription>Status das remessas</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomPieChart data={remessaStats} title="Remessas" />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-rose-600" />
              Notificações
            </CardTitle>
            <CardDescription>Lidas vs não lidas</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomPieChart
              data={[
                { name: "Lidas", value: notificacoesLidas },
                { name: "Não Lidas", value: notificacoesNaoLidas },
              ]}
              title="Notificações"
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-sky-600" />
              Despachos
            </CardTitle>
            <CardDescription>Finalizados vs pendentes</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomPieChart
              data={[
                { name: "Finalizados", value: despachosFinalizados },
                { name: "Pendentes", value: despachosPendentes },
              ]}
              title="Despachos"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              Tendência de Despachos
            </CardTitle>
            <CardDescription>Evolução ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomLineChart
              data={(() => {
                const data = despachos.reduce((acc: any, d: any) => {
                  const mes = formatDate(d.createdAt);
                  acc[mes] = (acc[mes] || 0) + 1;
                  return acc;
                }, {});
                return Object.entries(data).map(([name, value]) => ({
                  name,
                  value: Number(value),
                }));
              })()}
              title="Tendência"
              color={COLORS.cyan}
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Diligências
            </CardTitle>
            <CardDescription>Estado das diligências</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomPieChart
              data={[
                { name: "Concluídas", value: diligenciasConcluidas },
                { name: "Pendentes", value: diligenciasPendentes },
              ]}
              title="Diligências"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}