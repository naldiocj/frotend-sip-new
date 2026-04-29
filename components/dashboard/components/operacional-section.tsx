"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Briefcase, CheckCircle2, Bell, Activity } from "lucide-react";
import { CustomChart } from "./chart-components";
import { useRemessaEstatisticas, useRemessasPorStatus, useDespachoEstatisticas, useDespachosPorEstado, useDiligenciaEstatisticas, useDiligenciasPorEstado, useDetidoEstatisticas, useDashboard } from "@/app/services/dashboard.service";
import { formatChartData } from "../utils";

export function OperacionalSection() {
  const dashboard = useDashboard();
  const remessaStats = useRemessaEstatisticas();
  const remessasPorStatus = useRemessasPorStatus();
  const despachoStats = useDespachoEstatisticas();
  const despachosPorEstado = useDespachosPorEstado();
  const diligenciaStats = useDiligenciaEstatisticas();
  const diligenciasPorEstado = useDiligenciasPorEstado();
  const detidoStats = useDetidoEstatisticas();

  const dashboardData = dashboard.data || {};
  const remessaData = remessaStats.data || {};
  const despachoData = despachoStats.data || {};
  const diligenciaData = diligenciaStats.data || {};
  const detidoData = detidoStats.data || {};
  const notificacaoData = dashboardData?.estatisticasNotificacao || {};

  const remessaStatsChart = formatChartData(remessasPorStatus.data || []);
  const mandatoStatsChart = formatChartData([
    { name: "Pendentes", value: dashboardData?.estatisticasMandato?.pendentes || 0 },
    { name: "Cumpridos", value: dashboardData?.estatisticasMandato?.cumpridos || 0 },
  ]);

  return (
    <section aria-labelledby="operacional-title">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4 text-amber-600" />
              Remessas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={remessaStatsChart}
              title="Remessas"
              defaultType="pie"
              isLoading={remessasPorStatus.isLoading}
              error={remessasPorStatus.isError}
              onRetry={() => remessasPorStatus.refetch()}
            />
            {remessaData && (
              <div className="mt-3 flex gap-2">
                <Badge variant="outline">Total: {remessaData.total || 0}</Badge>
                <Badge variant="outline" className="text-emerald-600">Concluídas: {remessaData.concluidas || 0}</Badge>
                <Badge variant="outline" className="text-amber-600">Pendentes: {remessaData.pendentes || 0}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-sky-600" />
              Despachos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={[{ name: "Finalizados", value: despachoData.finalizados || 0 }, { name: "Pendentes", value: despachoData.pendentes || 0 }]}
              title="Despachos"
              defaultType="pie"
              isLoading={despachoStats.isLoading}
              error={despachoStats.isError}
              onRetry={() => despachoStats.refetch()}
            />
            {despachoData && (
              <div className="mt-3 flex gap-2">
                <Badge variant="outline">Total: {despachoData.total || 0}</Badge>
                <Badge variant="outline" className="text-emerald-600">Finalizados: {despachoData.finalizados || 0}</Badge>
                <Badge variant="outline" className="text-amber-600">Pendentes: {despachoData.pendentes || 0}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Diligências
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={[{ name: "Concluídas", value: diligenciaData.concluidas || 0 }, { name: "Pendentes", value: diligenciaData.pendentes || 0 }]}
              title="Diligências"
              defaultType="pie"
              isLoading={diligenciaStats.isLoading}
              error={diligenciaStats.isError}
              onRetry={() => diligenciaStats.refetch()}
            />
            {diligenciaData && (
              <div className="mt-3 flex gap-2">
                <Badge variant="outline">Total: {diligenciaData.total || 0}</Badge>
                <Badge variant="outline" className="text-emerald-600">Concluídas: {diligenciaData.concluidas || 0}</Badge>
                <Badge variant="outline" className="text-amber-600">Pendentes: {diligenciaData.pendentes || 0}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4 text-orange-600" />
              Mandados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={mandatoStatsChart}
              title="Mandados"
              defaultType="pie"
              isLoading={dashboard.isLoading}
              error={dashboard.isError}
              onRetry={() => dashboard.refetch()}
            />
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-rose-600" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={[{ name: "Lidas", value: notificacaoData.lidas || 0 }, { name: "Não Lidas", value: notificacaoData.naoLidas || 0 }]}
              title="Notificações"
              defaultType="pie"
              isLoading={dashboard.isLoading}
              error={dashboard.isError}
              onRetry={() => dashboard.refetch()}
            />
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              Tendência de Despachos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={formatChartData(despachosPorEstado.data || [])}
              title="Tendência"
              defaultType="line"
              color="#06b6d4"
              isLoading={despachosPorEstado.isLoading}
              error={despachosPorEstado.isError}
              onRetry={() => despachosPorEstado.refetch()}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
