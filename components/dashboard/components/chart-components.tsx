"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LineChart as RechartsLineChart } from "recharts";
import { ChartSkeleton } from "./chart-skeleton";
import { ErrorCard } from "./error-card";

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

type ChartType = "area" | "bar" | "line" | "pie";

function ChartTypeToggle({
  activeType,
  onTypeChange,
}: {
  activeType: ChartType;
  onTypeChange: (type: ChartType) => void;
}) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Tipo de gráfico">
      <Button
        variant={activeType === "area" ? "default" : "ghost"}
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() => onTypeChange("area")}
        aria-label="Gráfico de área"
        aria-pressed={activeType === "area"}
      >
        <TrendingUp className="h-4 w-4" />
      </Button>
      <Button
        variant={activeType === "bar" ? "default" : "ghost"}
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() => onTypeChange("bar")}
        aria-label="Gráfico de barra"
        aria-pressed={activeType === "bar"}
      >
        <BarChart3 className="h-4 w-4" />
      </Button>
      <Button
        variant={activeType === "line" ? "default" : "ghost"}
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() => onTypeChange("line")}
        aria-label="Gráfico de linha"
        aria-pressed={activeType === "line"}
      >
        <LineChartIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={activeType === "pie" ? "default" : "ghost"}
        size="sm"
        className="h-7 w-7 p-0"
        onClick={() => onTypeChange("pie")}
        aria-label="Gráfico de pizza"
        aria-pressed={activeType === "pie"}
      >
        <PieChartIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function CustomChart({
  data,
  title,
  defaultType = "area",
  color = "#3b82f6",
  isLoading,
  error,
  onRetry,
}: {
  data: { name: string; value: number }[];
  title: string;
  defaultType?: ChartType;
  color?: string;
  isLoading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}) {
  const [chartType, setChartType] = useState<ChartType>(defaultType);

  if (isLoading) return <ChartSkeleton />;
  if (error) return <ErrorCard message="Erro ao carregar dados" onRetry={onRetry || (() => {})} />;
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground text-sm" aria-label="Sem dados">
        Sem dados
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderChart = () => {
    switch (chartType) {
      case "pie":
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
                aria-label={`Gráfico de pizza: ${title}`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
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
                formatter={(value, name) => [
                  `${value} (${total > 0 ? Math.round((Number(value) / total) * 100) : 0}%)`,
                  name,
                ]}
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

      case "bar":
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

      case "line":
        return (
          <ResponsiveContainer width="100%" height={260}>
            <RechartsLineChart data={data}>
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
            </RechartsLineChart>
          </ResponsiveContainer>
        );

      case "area":
      default:
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id={`color${title.replace(/\s/g, "")}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
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
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <ChartTypeToggle activeType={chartType} onTypeChange={setChartType} />
      </div>
      {renderChart()}
    </div>
  );
}
