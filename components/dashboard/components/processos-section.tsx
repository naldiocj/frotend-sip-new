"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Scale, Layers, LayoutDashboard } from "lucide-react";
import { CustomChart } from "./chart-components";
import { useProcessoEstatisticas, useProcessoEvolucao, useProcessosPorEstado, useProcessosPorTipo, useProcessosPorDireccao, useProcessosPorTipoCrime } from "@/app/services/dashboard.service";
import { formatChartData } from "../utils";

export function ProcessosSection({ selectedMonths, onMonthChange }: { selectedMonths: number; onMonthChange: (months: number) => void }) {
  const processoStats = useProcessoEstatisticas();
  const processoEvolucao = useProcessoEvolucao(selectedMonths);
  const processosPorEstado = useProcessosPorEstado();
  const processosPorTipo = useProcessosPorTipo();
  const processosPorDireccao = useProcessosPorDireccao();
  const processosPorTipoCrime = useProcessosPorTipoCrime();

  const evolucaoChartData = formatChartData(processoEvolucao.data || []);
  const processStatusStats = formatChartData(processosPorEstado.data || []);
  const processTypeStats = formatChartData(processosPorTipo.data || []);
  const direcaoStats = formatChartData(processosPorDireccao.data || []);
  const processTypeCrimeStats = formatChartData(processosPorTipoCrime.data || []);

  return (
    <section aria-labelledby="processos-title">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Evolução de Processos
            </CardTitle>
            <CardDescription>Processos criados por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={evolucaoChartData}
              title="Evolução"
              defaultType="area"
              color="#3b82f6"
              isLoading={processoEvolucao.isLoading}
              error={processoEvolucao.isError}
              onRetry={() => processoEvolucao.refetch()}
            />
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Scale className="h-4 w-4 text-cyan-600" />
              Por Estado
            </CardTitle>
            <CardDescription>Distribuição por estado</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={processStatusStats}
              title="Estado"
              defaultType="bar"
              color="#3b82f6"
              isLoading={processosPorEstado.isLoading}
              error={processosPorEstado.isError}
              onRetry={() => processosPorEstado.refetch()}
            />
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Scale className="h-4 w-4 text-amber-600" />
              Por Tipo de Crime
            </CardTitle>
            <CardDescription>Distribuição por crime</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={processTypeCrimeStats}
              title="Tipos de Crime"
              defaultType="bar"
              color="#f59e0b"
              isLoading={processosPorTipoCrime.isLoading}
              error={processosPorTipoCrime.isError}
              onRetry={() => processosPorTipoCrime.refetch()}
            />
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              Por Tipo
            </CardTitle>
            <CardDescription>Tipos de processos</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={processTypeStats}
              title="Tipos"
              defaultType="pie"
              isLoading={processosPorTipo.isLoading}
              error={processosPorTipo.isError}
              onRetry={() => processosPorTipo.refetch()}
            />
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-emerald-600" />
              Por Direção
            </CardTitle>
            <CardDescription>Distribuição por direção</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={direcaoStats}
              title="Direções"
              defaultType="pie"
              isLoading={processosPorDireccao.isLoading}
              error={processosPorDireccao.isError}
              onRetry={() => processosPorDireccao.refetch()}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
