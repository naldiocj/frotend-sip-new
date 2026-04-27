import { getTiposCrimes } from "@/app/services/tipo-crime.service";
import { TiposCrimesPageClient } from "@/components/admin/tipos-crimes-page-client";
import { TipoCrimeDTO } from "@/lib/dto/tipo-crime.dto";

export const dynamic = "force-dynamic";

export default async function Page() {
  const tiposCrimes = await getTiposCrimes();

  return <TiposCrimesPageClient initialData={tiposCrimes} />;
}