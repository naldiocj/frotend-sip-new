"use client";

import { deleteUser } from "@/app/services/user.service";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

interface UserTableActionsProps {
  id: string;
}

export function UserTableActions({ id }: UserTableActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Tem certeza que deseja apagar este utilizador?",
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const response = await deleteUser(id);

      if (response.status === 200) {
        toast.success(response.message || "Utilizador apagado com sucesso.");
        router.refresh();
        return;
      }

      toast.error(response.message || "Erro ao apagar o utilizador.");
    });
  }

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <Button asChild variant="outline" size="icon" title="Editar utilizador">
        <Link href={`/admin/usuarios/${id}`}>
          <Edit3 className="size-4" aria-hidden="true" />
        </Link>
      </Button>

      <Button
        variant="destructive"
        size="icon"
        onClick={handleDelete}
        disabled={isPending}
        title="Apagar utilizador"
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
