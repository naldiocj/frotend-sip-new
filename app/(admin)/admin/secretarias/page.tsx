import { getSecretarias } from "@/app/services/secretaria.service";
import { SecretariasPageClient } from "@/components/admin/secretarias-page-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  const secretarias = await getSecretarias();

  return <SecretariasPageClient initialData={secretarias} />;
}