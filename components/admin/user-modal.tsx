"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { UserPlus, Loader2 } from "lucide-react";

interface Role {
  id: number;
  name: string;
}

interface UserModalProps {
  onSuccess?: () => void;
  roles?: Role[];
}

export function UserModal({ onSuccess, roles = [] }: UserModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    provider: "LOCAL",
    roleIds: [] as number[],
    active: true,
    emailVerified: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Nome e email são obrigatórios.");
      return;
    }

    if (formData.provider === "LOCAL" && !formData.password) {
      toast.error("Password é obrigatória para registo local.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords não coincidem.");
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Utilizador registado com sucesso.");
        setOpen(false);
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          provider: "LOCAL",
          roleIds: [],
          active: true,
          emailVerified: false,
        });
        onSuccess?.();
      } else {
        toast.error(data.message || "Erro ao registar utilizador.");
      }
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
    } finally {
      setIsPending(false);
    }
  };

  const toggleRole = (roleId: number) => {
    setFormData((prev) => ({
      ...prev,
      roleIds: prev.roleIds.includes(roleId)
        ? prev.roleIds.filter((id) => id !== roleId)
        : [...prev.roleIds, roleId],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Novo Utilizador
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl" size="full">
        <DialogHeader>
          <DialogTitle>Registar Novo Utilizador</DialogTitle>
          <DialogDescription>
            Preencha os dados para criar um novo utilizador no sistema.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                placeholder="João Manuel Silva"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="joao.silva@sip.gov.ao"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Telefone</Label>
              <Input
                id="phoneNumber"
                placeholder="+244 9XX XXX XXX"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider">Método de Autenticação</Label>
              <Select
                value={formData.provider}
                onValueChange={(value) =>
                  setFormData({ ...formData, provider: value as "LOCAL" | "GOOGLE" | "FACEBOOK" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOCAL">Local (Password)</SelectItem>
                  <SelectItem value="GOOGLE">Google</SelectItem>
                  <SelectItem value="FACEBOOK">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.provider === "LOCAL" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required={formData.provider === "LOCAL"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    required={formData.provider === "LOCAL"}
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-2">
            <Label>Perfis *</Label>
            <div className="flex flex-wrap gap-2">
              {roles.length > 0 ? (
                roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => toggleRole(role.id)}
                    className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition-colors ${
                      formData.roleIds.includes(role.id)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {role.name}
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">
                  Carregue os perfis disponíveis
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, active: !!checked })
                }
              />
              <Label htmlFor="active" className="text-sm font-normal">
                Ativo
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="emailVerified"
                checked={formData.emailVerified}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, emailVerified: !!checked })
                }
              />
              <Label htmlFor="emailVerified" className="text-sm font-normal">
                Email Verificado
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Registar Utilizador
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}