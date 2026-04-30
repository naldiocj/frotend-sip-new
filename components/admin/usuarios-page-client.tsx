"use client";

import { UserModal } from "@/components/admin/user-modal";
import { UsersTable } from "@/components/admin/users-table";
import { RoleDTO, UserDTO } from "@/lib/dto/user.dto";
import { useState } from "react";

interface PageProps {
  initialUsers: UserDTO[];
  initialRoles: RoleDTO[];
}

export function UsuariosPageClient({ initialUsers, initialRoles }: PageProps) {
  const [users] = useState<UserDTO[]>(initialUsers);
  const [roles] = useState<RoleDTO[]>(initialRoles);

  return (
    <main className="bg-background px-4">
      <div className="flex flex-col gap-6">
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Catálogo de Utilizadores
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Gestão de utilizadores SIP
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte e registre novos utilizadores do sistema. Mantemos o
                acesso e os perfis atualizados para a operação institucional.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <UserModal roles={roles} />
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="p-6 lg:p-8">
            <UsersTable data={users} roles={roles} />
          </div>
        </section>
      </div>
    </main>
  );
}
