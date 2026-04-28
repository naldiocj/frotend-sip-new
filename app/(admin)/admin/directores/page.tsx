import { getDirectores } from "@/app/services/director.service";
import { getPatentes } from "@/app/services/patente.service";
import { getCargos } from "@/app/services/cargo.service";
import { getDireccoes } from "@/app/services/direccao.service";
import { getUsers } from "@/app/services/user.service";
import { DirectoresPageClient } from "@/components/admin/directores-page-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [directores, patentes, cargos, direccoes, usuarios] = await Promise.all([
    getDirectores(),
    getPatentes(),
    getCargos(),
    getDireccoes(),
    getUsers(),
  ]);

  return (
    <DirectoresPageClient
      initialData={directores}
      patentes={patentes}
      cargos={cargos}
      direccoes={direccoes}
      usuarios={usuarios}
    />
  );
}