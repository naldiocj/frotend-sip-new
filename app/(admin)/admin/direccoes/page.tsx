import { getDireccoes } from "@/app/services/direccao.service";
import { DireccoesPageClient } from "@/components/admin/direccoes-page-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  const direccoes = await getDireccoes();

  return <DireccoesPageClient initialData={direccoes} />;
}