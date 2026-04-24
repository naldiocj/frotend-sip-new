"use client";

import { registerUser } from "@/app/actions/user.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserDTO } from "@/lib/dto/user.dto";
import * as React from "react";
import { toast } from "sonner";

type CreateUserForm = Omit<UserDTO, "id" | "createdAt" | "updatedAt">;

export function UserForm() {
  const [isPending, startTransition] = React.useTransition();
  const [active, setActive] = React.useState(true);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
    const rolesString = String(formData.get("roles") ?? "").trim();
    const roles = rolesString
      .split(",")
      .map((role) => role.trim())
      .filter(Boolean)
      .map((role) => ({
        id: role.toLowerCase().replace(/\s+/g, "-"),
        name: role,
      }));

    if (!name || !email) {
      toast.error("Informe nome e email do utilizador.");
      return;
    }

    const payload: any = {
      name,
      email,
      phoneNumber,
      roles,
      active,
    };

    startTransition(async () => {
      const response = await registerUser(payload);

      if (response.status === 200) {
        toast.success("Utilizador registado com sucesso.");
        window.location.reload();
        return;
      }

      toast.error(response.message || "Erro ao registar o utilizador.");
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Nome
        </label>
        <Input id="name" name="name" placeholder="Nome completo" />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="usuario@sip.gov.ao"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="phoneNumber"
          className="text-sm font-medium text-foreground"
        >
          Telefone
        </label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          placeholder="+244 9XX XXX XXX"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="roles" className="text-sm font-medium text-foreground">
          Perfis
        </label>
        <Input
          id="roles"
          name="roles"
          placeholder="ADMIN, INSTRUTOR, SECRETARIA"
        />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <label
          htmlFor="active"
          className="flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <input
            id="active"
            name="active"
            type="checkbox"
            checked={active}
            onChange={(event) => setActive(event.target.checked)}
            className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
          />
          Ativo
        </label>
        <p className="text-xs text-muted-foreground">
          Marque como ativo para habilitar imediatamente o utilizador.
        </p>
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Registando..." : "Registar novo utilizador"}
        </Button>
      </div>
    </form>
  );
}
