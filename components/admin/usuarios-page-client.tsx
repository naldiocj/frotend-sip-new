"use client";

import { useState } from "react";
import { UsersTable } from "@/components/admin/users-table";
import { UserModal } from "@/components/admin/user-modal";
import { Users } from "lucide-react";
import { UserDTO, RoleDTO } from "@/lib/dto/user.dto";

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
                Consulte e registre novos utilizadores do sistema. Mantemos o acesso e os
                perfis atualizados para a operação institucional.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <UserModal roles={roles} />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                    Total
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {users.length}
                  </p>
                </div>
              </div>
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