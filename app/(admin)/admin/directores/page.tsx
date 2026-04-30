import { getDirectores } from "@/app/services/director.service";
import { getPatentes } from "@/app/services/patente.service";
import { getCargos } from "@/app/services/cargo.service";
import { getDireccoes } from "@/app/services/direccao.service";
import { getUsers } from "@/app/services/user.service";
import { DirectoresPageClient } from "@/components/admin/directores-page-client";
import { convertData } from "@/lib/date-utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id?: string }>;
}

export default async function Page({ params }: PageProps) {
  const idParams = await params;
  const [directores, patentes, cargos, direccoes, usuarios] = await Promise.all([
    getDirectores(),
    getPatentes(),
    getCargos(),
    getDireccoes(),
    getUsers(),
  ]);

  if (idParams?.id) {
    const director = directores.find((d) => d.id === Number(idParams.id));
    if (director) {
      const patente = patentes.find((p) => p.id === director.patenteId);
      const cargo = cargos.find((c) => c.id === director.cargoId);
      const direcao = direccoes.find((d) => d.id === director.direcaoId);
      const usuario = usuarios.find((u) => u.id === director.userId);

      return (
        <main className="p-8">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold">{director.nomeCompleto}</h2>
            <p className="text-muted-foreground">{patente?.nome || "—"} - {cargo?.nome || "—"}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Direção: {direcao?.nome || "—"} | Usuário: {usuario?.name || usuario?.email || "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Criado em: {director.createdAt ? convertData(director.createdAt) : "—"} | 
              Atualizado em: {director.updatedAt ? convertData(director.updatedAt) : "—"}
            </p>
          </div>
        </main>
      );
    }
  }

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