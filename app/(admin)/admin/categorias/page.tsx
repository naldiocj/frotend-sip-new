import { getCategorias } from "@/app/services/categoria.service";
import { CategoriasPageClient } from "@/components/admin/categorias-page-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  const categorias = await getCategorias();

  return <CategoriasPageClient initialData={categorias} />;
}