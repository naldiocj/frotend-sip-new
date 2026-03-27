"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
} from "lucide-react";

const instructorStats = [
  {
    title: "Meus Processos",
    value: "12",
    description: "Em fase de instrução",
    icon: FileText,
    color:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  },
  {
    title: "Diligências Hoje",
    value: "4",
    description: "Audiências e buscas",
    icon: Calendar,
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  {
    title: "Relatórios Pendentes",
    value: "3",
    description: "Aguardando submissão",
    icon: Clock,
    color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  },
  {
    title: "Concluídos (Mês)",
    value: "8",
    description: "Remetidos ao MP",
    icon: CheckCircle2,
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
];

const recentCases = [
  {
    id: 1,
    num: "012/SIC/2024",
    crime: "Roubo Qualificado",
    status: "Diligência",
    data: "2024-01-28",
  },
  {
    id: 2,
    num: "145/SIC/2024",
    crime: "Tráfico de Estupefacientes",
    status: "Relatório",
    data: "2024-01-25",
  },
  {
    id: 3,
    num: "089/SIC/2024",
    crime: "Burla por Defraudaçãp",
    status: "Novo",
    data: "2024-01-29",
  },
];

export function PGRDashboard() {
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
                        variant={c.status === "Novo" ? "default" : "secondary"}
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
              <div className="group flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted transition-colors cursor-pointer border border-transparent hover:border-muted-foreground/10">
                <div className="mt-1 bg-amber-500/10 p-1.5 rounded-full">
                  <AlertCircle className="h-3 w-3 text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold tracking-tight">
                    Ouvir Testemunha
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase mt-0.5">
                    Processo: 012/2024
                  </p>
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 rounded">
                  Hoje
                </span>
              </div>

              <div className="group flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted transition-colors cursor-pointer border border-transparent hover:border-muted-foreground/10">
                <div className="mt-1 bg-blue-500/10 p-1.5 rounded-full">
                  <Clock className="h-3 w-3 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold tracking-tight">
                    Concluir Relatório
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase mt-0.5">
                    Processo: 145/2024
                  </p>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground bg-muted-foreground/10 px-1.5 py-0.5 rounded">
                  Amanhã
                </span>
              </div>
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
