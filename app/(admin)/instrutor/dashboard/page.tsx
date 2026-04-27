import { getUserSession } from "@/app/services/user.service";
import { getProcessos } from "@/app/services/processo.service";
import { getQueixosos } from "@/app/services/queixosos.service";
import { getArguidos } from "@/app/services/arguido.service";
import { getTestemunhas } from "@/app/services/testemunha.service";
import { getAdvogados } from "@/app/services/advogado.service";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { DirectorDashboard } from "@/components/dashboard/director-dashboard";
import { InstructorDashboard } from "@/components/dashboard/instructor-dashboard";
import { PGRDashboard } from "@/components/dashboard/pgr-dashboard";
import { PiqueteDashboard } from "@/components/dashboard/piquete-dashboard";
import { SecretariaDashboard } from "@/components/dashboard/secretaria-dashboard";
import { ROLES } from "@/lib/constants";
import { RoleDTO } from "@/lib/dto/role.dto";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getUserSession();
  const roles: RoleDTO[] = session.data?.roles ?? [];
  const roleNames = roles.map((role) => role.name);

  const processosPromise = getProcessos();
  const queixososPromise = getQueixosos();
  const arguidosPromise = getArguidos();
  const testemunhasPromise = getTestemunhas();
  const advogadosPromise = getAdvogados();

  const [processos, queixosos, arguidos, testemunhas, advogados] = await Promise.all([
    processosPromise,
    queixososPromise,
    arguidosPromise,
    testemunhasPromise,
    advogadosPromise,
  ]);

  return (
    <div className="px-4">
      {roleNames.includes(ROLES.ADMIN) && <AdminDashboard />}
      {roleNames.length === 1 && roleNames.includes(ROLES.DIRECTOR) && (
        <DirectorDashboard />
      )}
      {roleNames.length === 1 && roleNames.includes(ROLES.INSTRUTOR) && (
        <InstructorDashboard
          processos={processos}
          queixosos={queixosos}
          arguidos={arguidos}
          testemunhas={testemunhas}
          advogados={advogados}
        />
      )}
      {roleNames.length === 1 && roleNames.includes(ROLES.SECRETARIA) && (
        <SecretariaDashboard />
      )}
      {roleNames.length === 1 && roleNames.includes(ROLES.SECRETARIA_GERAL) && (
        <SecretariaDashboard />
      )}
      {roleNames.length === 1 && roleNames.includes(ROLES.PGR) && (
        <PGRDashboard />
      )}
      {roleNames.length === 1 && roleNames.includes(ROLES.PIQUETE) && (
        <PiqueteDashboard />
      )}
      {roleNames.length === 0 && (
        <div className="rounded-2xl border border-border/60 bg-card p-10 text-center text-muted-foreground">
          Não foi possível determinar as permissões do utilizador.
        </div>
      )}
    </div>
  );
}