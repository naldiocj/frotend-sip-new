"use client";

import { FileText, Clock, Archive, Send, Gavel, AlertTriangle, CheckCircle2, Users, Activity, Layers, FolderTree, LayoutDashboard, Box, Scale, UserRound, Bell } from "lucide-react";
import { KpiCard } from "./kpi-card";
import { useDashboard, useProcessoEstatisticas, useUsuarioEstatisticas, useDiligenciaEstatisticas, useDetidoEstatisticas, useCategorias, useDireccoes, usePatentes, useTiposCrimes } from "@/app/services/dashboard.service";

export function OverviewSection() {
  const dashboard = useDashboard();
  const processoStats = useProcessoEstatisticas();
  const usuarioStats = useUsuarioEstatisticas();
  const diligenciaStats = useDiligenciaEstatisticas();
  const detidoStats = useDetidoEstatisticas();
  const categorias = useCategorias();
  const direccoes = useDireccoes();
  const patentes = usePatentes();
  const tiposCrimes = useTiposCrimes();

  const dashboardData = dashboard.data || {};
  const processoData = processoStats.data || {};
  const usuarioData = usuarioStats.data || {};
  const diligenciaData = diligenciaStats.data || {};
  const detidoData = detidoStats.data || {};

  return (
    <section aria-labelledby="overview-title">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <KpiCard title="Processos" value={processoData.total || 0} icon={FileText} color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" description="Total" isLoading={processoStats.isLoading} />
        <KpiCard title="Em Instrução" value={processoData.emInstrucao || 0} icon={Clock} color="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" description="Em análise" isLoading={processoStats.isLoading} />
        <KpiCard title="Arquivados" value={processoData.arquivados || 0} icon={Archive} color="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" isLoading={processoStats.isLoading} />
        <KpiCard title="Remetidos" value={(processoData.remetidoJuizo || 0) + (processoData.remetidoPGR || 0)} icon={Send} color="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" isLoading={processoStats.isLoading} />
        <KpiCard title="Sentenciados" value={processoData.sentenciados || 0} icon={Gavel} color="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" isLoading={processoStats.isLoading} />
        <KpiCard title="Com Detido" value={processoData.comDetido || 0} icon={AlertTriangle} color="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" isLoading={processoStats.isLoading} />
        <KpiCard title="Diligências" value={diligenciaData.total || 0} icon={CheckCircle2} color="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" description="Total" isLoading={diligenciaStats.isLoading} />
        <KpiCard title="Utilizadores" value={usuarioData.total || 0} icon={Users} color="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" description="Total" isLoading={usuarioStats.isLoading} />
        <KpiCard title="Ativos" value={usuarioData.ativos || 0} icon={CheckCircle2} color="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" isLoading={usuarioStats.isLoading} />
        <KpiCard title="Inativos" value={usuarioData.inativos || 0} icon={Clock} color="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" isLoading={usuarioStats.isLoading} />
        <KpiCard title="Online 24h" value={usuarioData.online24h || 0} icon={Activity} color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" isLoading={usuarioStats.isLoading} />
        <KpiCard title="Sem Login" value={usuarioData.semLogin || 0} icon={AlertTriangle} color="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" isLoading={usuarioStats.isLoading} />
        <KpiCard title="Mandados" value={dashboardData?.estatisticasMandato?.total || 0} icon={Scale} color="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400" isLoading={dashboard.isLoading} />
        <KpiCard title="Detidos" value={detidoData.total || 0} icon={UserRound} color="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" isLoading={detidoStats.isLoading} />
        <KpiCard title="Notificações" value={dashboardData?.estatisticasNotificacao?.total || 0} icon={Bell} color="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" isLoading={dashboard.isLoading} />
      </div>
    </section>
  );
}
