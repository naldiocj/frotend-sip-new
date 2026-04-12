import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Box,
  FileText,
  Flame,
  LayoutDashboard,
  Layers,
  FolderTree,
  Users,
} from "lucide-react";
import { WeaponsDistributionChart } from "../chart/charts";
import { getProcessos } from "@/app/services/processo.service";
import { getCategorias } from "@/app/services/categoria.service";
import { getDireccoes } from "@/app/services/direccao.service";
import { getPatentes } from "@/app/services/patente.service";
import { getTiposCrimes } from "@/app/services/tipo-crime.service";
import { getUsers } from "@/app/services/user.service";

export async function AdminDashboard() {
  const [processos, categorias, direccoes, patentes, tiposCrimes, users] =
    await Promise.all([
      getProcessos(),
      getCategorias(),
      getDireccoes(),
      getPatentes(),
      getTiposCrimes(),
      getUsers(),
    ]);

  const totalProcessos = processos.length;
  const totalComDetidos = processos.filter(
    (p) => p.tipoProcesso === "COM_DETIDO",
  ).length;
  const totalTiposCrimes = tiposCrimes.length;
  const totalPatentes = patentes.length;
  const totalDireccoes = direccoes.length;
  const totalCategorias = categorias.length;
  const totalUsers = users.length;

  const processTypeDistribution = [
    {
      name: "Normal",
      value: processos.filter((p) => p.tipoProcesso === "NORMAL").length,
    },
    {
      name: "Averiguação",
      value: processos.filter((p) => p.tipoProcesso === "AVERIGUACAO").length,
    },
    { name: "Com detido", value: totalComDetidos },
    {
      name: "Sem tipo",
      value: processos.filter((p) => p.tipoProcesso === null).length,
    },
  ].filter((item) => item.value > 0);

  if (processTypeDistribution.length === 0) {
    processTypeDistribution.push({ name: "Sem processos", value: 1 });
  }

  const adminStats = [
    {
      title: "Utilizadores",
      value: String(totalUsers),
      description: "Total de utilizadores do sistema",
      icon: Users,
      color: "bg-blue-50/50 text-blue-500 border-blue-100",
    },
    {
      title: "Processos existentes",
      value: String(totalProcessos),
      description: "Total de processos no sistema",
      icon: FileText,
      color: "bg-orange-50/50 text-orange-500 border-orange-100",
    },
    {
      title: "Tipos de crime",
      value: String(totalTiposCrimes),
      description: "Catálogo de tipos de crime",
      icon: Layers,
      color: "bg-blue-50/50 text-blue-500 border-blue-100",
    },
    {
      title: "Patentes",
      value: String(totalPatentes),
      description: "Patentes configuradas no SIP",
      icon: FolderTree,
      color: "bg-violet-50/50 text-violet-500 border-violet-100",
    },
    {
      title: "Direções",
      value: String(totalDireccoes),
      description: "Direções cadastradas",
      icon: LayoutDashboard,
      color: "bg-emerald-50/50 text-emerald-500 border-emerald-100",
    },
    {
      title: "Categorias",
      value: String(totalCategorias),
      description: "Categorias de processos e registros",
      icon: Box,
      color: "bg-purple-50/50 text-purple-500 border-purple-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {adminStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="hover:shadow-md transition-shadow bg-card shadow-sm border-muted/60"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-tight">
                    {stat.title}
                  </span>
                  <div
                    className={cn(
                      "p-2 rounded-lg border dark:bg-accent-foreground",
                      stat.color,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight">
                  {stat.value}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-muted/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Distribuição de Processos
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center p-6">
            <WeaponsDistributionChart data={processTypeDistribution} />
          </CardContent>
        </Card>

        <Card className="border-muted/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Indicadores de Admin
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex flex-col justify-center gap-4 p-6 text-sm text-muted-foreground bg-slate-50/50 dark:bg-slate-900/10 rounded-xl border border-dashed border-muted">
            <div>
              <p className="font-semibold text-foreground">
                Páginas existentes
              </p>
              <p className="mt-2">
                Tipos de crimes, patentes, direções e categorias.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Uso atual</p>
              <p className="mt-2">
                O dashboard mostra apenas processos ativos e indicadores de
                cadastrado.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
