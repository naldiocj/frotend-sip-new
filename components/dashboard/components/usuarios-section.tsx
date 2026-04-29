"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, LayoutDashboard } from "lucide-react";
import { CustomChart } from "./chart-components";
import { useUsuarioEstatisticas, useUsuarioEvolucao, useUsuariosPorDireccao, useUsuariosPorFuncao } from "@/app/services/dashboard.service";
import { formatChartData } from "../utils";

export function UsuariosSection({ selectedMonths, onMonthChange }: { selectedMonths: number; onMonthChange: (months: number) => void }) {
  const usuarioStats = useUsuarioEstatisticas();
  const usuarioEvolucao = useUsuarioEvolucao(selectedMonths);
  const usuariosPorDireccao = useUsuariosPorDireccao();
  const usuariosPorFuncao = useUsuariosPorFuncao();

  const usuarioData = usuarioStats.data || {};
  const userCreationChartData = formatChartData(usuarioEvolucao.data || []);
  const usuarioStatsChart = formatChartData([
    { name: "Ativos", value: usuarioData.ativos || 0 },
    { name: "Inativos", value: usuarioData.inativos || 0 },
  ]);
  const usersByDirection = formatChartData(usuariosPorDireccao.data || []);
  const userRoleStatsArray = formatChartData(usuariosPorFuncao.data || []);

  return (
    <section aria-labelledby="users-title">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-600" />
              Evolução Mensal
            </CardTitle>
            <CardDescription>Utilizadores criados por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={userCreationChartData}
              title="Evolução"
              defaultType="line"
              color="#06b6d4"
              isLoading={usuarioEvolucao.isLoading}
              error={usuarioEvolucao.isError}
              onRetry={() => usuarioEvolucao.refetch()}
            />
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Estado dos Utilizadores
            </CardTitle>
            <CardDescription>Ativos vs Inativos</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={usuarioStatsChart}
              title="Estado"
              defaultType="pie"
              isLoading={usuarioStats.isLoading}
              error={usuarioStats.isError}
              onRetry={() => usuarioStats.refetch()}
            />
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-orange-600" />
              Por Direção
            </CardTitle>
            <CardDescription>Distribuição por direção</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={usersByDirection}
              title="Direções"
              defaultType="pie"
              isLoading={usuariosPorDireccao.isLoading}
              error={usuariosPorDireccao.isError}
              onRetry={() => usuariosPorDireccao.refetch()}
            />
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-violet-600" />
              Por Função
            </CardTitle>
            <CardDescription>Distribuição por role</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomChart
              data={userRoleStatsArray}
              title="Funções"
              defaultType="bar"
              color="#8b5cf6"
              isLoading={usuariosPorFuncao.isLoading}
              error={usuariosPorFuncao.isError}
              onRetry={() => usuariosPorFuncao.refetch()}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
