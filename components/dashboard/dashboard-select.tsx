"use client";

import { useUser } from "@/hooks/user-context";
import { AdminDashboard } from "./admin-dashboard";
import { DirectorDashboard } from "./director-dashboard";
import { InstructorDashboard } from "./instructor-dashboard";
import { PGRDashboard } from "./pgr-dashboard";
import { PiqueteDashboard } from "./piquete-dashboard";
import { SecretariaDashboard } from "./secretaria-dashboard";

export default function DashboardSelect() {
  const { isAdmin, isPiquete, isInstrutor, isDirector, isSecretaria, isPGR } =
    useUser();
  return (
    <div className="px-4">
      {isAdmin && <AdminDashboard />}
      {isPiquete && <PiqueteDashboard />}
      {isInstrutor && <InstructorDashboard />}
      {isDirector && <DirectorDashboard />}
      {isSecretaria && <SecretariaDashboard />}
      {isPGR && <PGRDashboard />}
    </div>
  );
}
