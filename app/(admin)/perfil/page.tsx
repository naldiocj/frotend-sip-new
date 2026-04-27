import { getUserSession } from "@/app/services/user.service";
import {
  User,
  CircleHelp,
  Mail,
  Phone,
  Building,
  Shield,
  Calendar,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await getUserSession();
  const userData = user?.data;

  if (!userData) {
    return (
      <main className="bg-background px-4">
        <div className="flex flex-col items-center justify-center py-20">
          <CircleHelp className="h-20 w-20 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-semibold">Perfil não disponível</h1>
          <p className="text-muted-foreground">
            Faça login para ver o seu perfil.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background px-4">
      <div className="mx-auto max-w-4xl space-y-6 py-6">
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="relative h-32 bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            <div className="absolute -bottom-12 left-6 h-24 w-24 overflow-hidden rounded-full border-4 border-background bg-background">
              <div className="flex h-full w-full items-center justify-center bg-primary text-3xl font-bold text-primary-foreground">
                {userData.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
          <div className="pt-16 pb-6 pr-6">
            <div className="flex flex-col gap-4 px-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {userData.name}
                </h1>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building className="h-4 w-4" />
                  {userData.direcao?.nome || "Direção do Interior"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData.roles?.map((role) => (
                  <div
                    key={role.id}
                    className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    <Shield className="h-3 w-3" />
                    {role.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
            <div className="border-b border-border/60 px-6 py-4">
              <h2 className="text-sm font-semibold">Informações Pessoais</h2>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Nome</p>
                  <p className="text-sm font-medium">{userData.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Telefone</p>
                  <p className="text-sm font-medium">
                    {userData.phoneNumber || "+244 000 000 000"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
            <div className="border-b border-border/60 px-6 py-4">
              <h2 className="text-sm font-semibold">Informações Profissionais</h2>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Building className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Direção</p>
                  <p className="text-sm font-medium">
                    {userData.direcao?.nome || "Não atribuída"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Função</p>
                  <p className="text-sm font-medium">
                    {userData.roles?.[0]?.name || "Instrutor"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <CircleHelp className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Estado</p>
                  <p className="text-sm font-medium">
                    {userData.active ? "Ativo" : "Inativo"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5 lg:col-span-2">
            <div className="border-b border-border/60 px-6 py-4">
              <h2 className="text-sm font-semibold">Atividade</h2>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Criado em
                  </p>
                  <p className="text-sm font-medium">
                    {userData.createdAt
                      ? new Date(userData.createdAt).toLocaleDateString("pt-BR")
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Última atualização
                  </p>
                  <p className="text-sm font-medium">
                    {userData.updatedAt
                      ? new Date(userData.updatedAt).toLocaleDateString("pt-BR")
                      : "—"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}