import { getAdvogados } from "@/app/services/advogado.service";
import { getArguidos } from "@/app/services/arguido.service";
import { getCategorias } from "@/app/services/categoria.service";
import { getDespachos } from "@/app/services/despacho.service";
import { getDetidos } from "@/app/services/detido.service";
import { getDireccoes } from "@/app/services/direccao.service";
import { getMandados } from "@/app/services/mandado.service";
import { getNotificacoes } from "@/app/services/notificacao.service";
import { getPatentes } from "@/app/services/patente.service";
import { getProcessos } from "@/app/services/processo.service";
import { getQueixosos } from "@/app/services/queixosos.service";
import { getRemessas } from "@/app/services/remessa.service";
import { getTestemunhas } from "@/app/services/testemunha.service";
import { getTiposCrimes } from "@/app/services/tipo-crime.service";
import { getUsers, getUserSession } from "@/app/services/user.service";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { DirectorDashboard } from "@/components/dashboard/director-dashboard";
import { InstructorDashboard } from "@/components/dashboard/instructor-dashboard";
import { PGRDashboard } from "@/components/dashboard/pgr-dashboard";
import { PiqueteDashboard } from "@/components/dashboard/piquete-dashboard";
import { SecretariaDashboard } from "@/components/dashboard/secretaria-dashboard";
import { ROLES } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getUserSession();
  const roles: any[] = session.data?.roles ?? [];
  const roleNames = roles.map((role) => role.name);

  const [
    processos,
    queixosos,
    arguidos,
    testemunhas,
    advogados,
    usuarios,
    categorias,
    direccoes,
    patentes,
    tiposCrimes,
    mandatos,
    notificacoes,
    remessas,
    despachos,
    detidos,
  ] = await Promise.all([
    getProcessos(),
    getQueixosos(),
    getArguidos(),
    getTestemunhas(),
    getAdvogados(),
    getUsers(),
    getCategorias(),
    getDireccoes(),
    getPatentes(),
    getTiposCrimes(),
    getMandados(),
    getNotificacoes(),
    getRemessas(),
    getDespachos(),
    getDetidos(),
  ]);

  return (
    <div className="px-4">
      {roleNames.includes(ROLES.ADMIN) && (
        <AdminDashboard />
      )}
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
