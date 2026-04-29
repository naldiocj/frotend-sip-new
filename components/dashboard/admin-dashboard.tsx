"use client";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OperacionalSection } from "./components/operacional-section";
import { OverviewSection } from "./components/overview-section";
import { ProcessosSection } from "./components/processos-section";
import { UsuariosSection } from "./components/usuarios-section";

export function AdminDashboard() {
  const [selectedMonths, setSelectedMonths] = useState(6);

  return (
    <div className="space-y-8 p-6" role="main" aria-label="Dashboard SIP">
      {/* Zona A: Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard SIP</h1>
          <p className="text-sm text-muted-foreground">
            Sistema de Instrução Processual
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={selectedMonths.toString()}
            onValueChange={(v) => setSelectedMonths(Number(v))}
          >
            <SelectTrigger
              className="w-[180px]"
              aria-label="Selecionar período"
            >
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 Meses</SelectItem>
              <SelectItem value="6">6 Meses (Padrão)</SelectItem>
              <SelectItem value="12">12 Meses</SelectItem>
              <SelectItem value="24">24 Meses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Zona B: KPI Cards */}
      <OverviewSection />

      {/* Zona C: Users Section */}
      <section aria-labelledby="users-title">
        <UsuariosSection
          selectedMonths={selectedMonths}
          onMonthChange={setSelectedMonths}
        />
      </section>

      {/* Zona C: Processos Section */}
      <section aria-labelledby="processos-title">
        <ProcessosSection
          selectedMonths={selectedMonths}
          onMonthChange={setSelectedMonths}
        />
      </section>

      {/* Zona D: Operational Section */}
      <section aria-labelledby="operacional-title">
        <OperacionalSection />
      </section>
    </div>
  );
}
