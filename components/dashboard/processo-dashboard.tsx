"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, UserLock } from "lucide-react";

const instructorStats = [
  {
    title: "Nº peças",
    value: "12",
    icon: FileText,
    color:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  },
  {
    title: "Crimes Imputados",
    value: "4",
    icon: UserLock,
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  {
    title: "Ano Judicial",
    value: "2026",
    icon: UserLock,
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  // {
  //   title: "Relatórios Pendentes",
  //   value: "3",
  //   description: "Aguardando submissão",
  //   icon: Clock,
  //   color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  // },
  // {
  //   title: "Concluídos (Mês)",
  //   value: "8",
  //   description: "Remetidos ao MP",
  //   icon: CheckCircle2,
  //   color:
  //     "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  // },
];

export function ProcessoDashboard() {
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
              <CardContent className="pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Icon className="h-8 w-5" />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {stat.title}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
