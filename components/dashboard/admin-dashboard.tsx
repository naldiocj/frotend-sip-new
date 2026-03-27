"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	Box,
	FileText,
	Flame,
	LayoutDashboard,
	Users,
	Zap,
} from "lucide-react";
import { WeaponsDistributionChart } from "../chart/charts";

const adminStats = [
	{
		title: "Total de Utilizadores",
		value: "1",
		description: "Utilizadores ativos no sistema",
		icon: Users,
		color: "bg-blue-50/50 text-blue-500 border-blue-100",
	},
	{
		title: "Total de Processos",
		value: "25",
		description: "Processos registados no sistema",
		icon: FileText,
		color: "bg-orange-50/50 text-orange-500 border-orange-100",
	},
	{
		title: "Total de Processos remetidos",
		value: "0",
		description: "Processos remetidos no sistema",
		icon: Zap,
		color: "bg-emerald-50/50 text-emerald-500 border-emerald-100",
	},
	{
		title: "Total de Processos Arquivados",
		value: "0",
		description: "Processos Arquivados",
		icon: Box,
		color: "bg-purple-50/50 text-purple-500 border-purple-100",
	},
	{
		title: "Total de Processos com detidos",
		value: "0",
		description: "Processos com detidos",
		icon: Flame,
		color: "bg-rose-50/50 text-rose-500 border-rose-100",
	},
];

export function AdminDashboard() {
	return (
		<div className="space-y-6">
			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
						<WeaponsDistributionChart />
					</CardContent>
				</Card>

				<Card className="border-muted/60 shadow-sm">
					<CardHeader>
						<CardTitle className="text-lg font-bold">
							Distribuição por Direcção
						</CardTitle>
					</CardHeader>
					<CardContent className="h-80 flex items-center justify-center text-muted-foreground p-6 bg-slate-50/50 dark:bg-slate-900/10 m-6 rounded-xl border border-dashed border-muted">
						<div className="flex flex-col items-center gap-2">
							<LayoutDashboard className="h-8 w-8 opacity-20" />
							<span className="text-sm font-medium">Sem dados para exibir</span>
						</div>
					</CardContent>
				</Card>

				<Card className="border-muted/60 shadow-sm">
					<CardHeader>
						<CardTitle className="text-lg font-bold">
							Distribuição por Tipo
						</CardTitle>
					</CardHeader>
					<CardContent className="h-80 flex items-center justify-center text-muted-foreground p-6 bg-slate-50/50 dark:bg-slate-900/10 m-6 rounded-xl border border-dashed border-muted">
						<div className="flex flex-col items-center gap-2">
							<LayoutDashboard className="h-8 w-8 opacity-20" />
							<span className="text-sm font-medium">Sem dados para exibir</span>
						</div>
					</CardContent>
				</Card>

				<Card className="border-muted/60 shadow-sm">
					<CardHeader>
						<CardTitle className="text-lg font-bold">
							Distribuição de Ocorrências
						</CardTitle>
					</CardHeader>
					<CardContent className="h-80 flex items-center justify-center text-muted-foreground p-6 bg-slate-50/50 dark:bg-slate-900/10 m-6 rounded-xl border border-dashed border-muted">
						<div className="flex flex-col items-center gap-2">
							<LayoutDashboard className="h-8 w-8 opacity-20" />
							<span className="text-sm font-medium">Sem dados para exibir</span>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
