import { getPatentes } from "@/app/services/patente.service";
import { PatentesPageClient } from "@/components/admin/patentes-page-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  const patentes = await getPatentes();

  return <PatentesPageClient initialData={patentes} />;
}