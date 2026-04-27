import { getUsers } from "@/app/services/user.service";
import { getRoles } from "@/app/services/role.service";
import { UsuariosPageClient } from "@/components/admin/usuarios-page-client";
import { UserDTO, RoleDTO } from "@/lib/dto/user.dto";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id?: string }>;
}

export default async function Page({ params }: PageProps) {
  const idParams = await params;
  const [users, roles] = await Promise.all([getUsers(), getRoles()]);

  if (idParams?.id) {
    const user = users.find((u) => u.id === Number(idParams.id));
    if (user) {
      return (
        <main className="p-8">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </main>
      );
    }
  }

  return <UsuariosPageClient initialUsers={users} initialRoles={roles} />;
}