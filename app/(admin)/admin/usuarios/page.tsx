import { getUsers } from "@/app/services/user.service";
import { UserDTO } from "@/lib/dto/user.dto";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Table, UserPlus, Users } from "lucide-react";
import { UserForm } from "@/components/admin/user-form";
import { UserTableActions } from "@/components/admin/user-table-actions";

export const dynamic = "force-dynamic";

export default async function Page() {
  const users: UserDTO[] = await getUsers();

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

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Total de utilizadores
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {users.length}{" "}
                  {users.length === 1 ? "utilizador" : "utilizadores"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5 p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <div className="mb-4 rounded-2xl border border-border/60 bg-muted/40 p-5">
                <p className="text-sm font-semibold text-foreground">
                  Registar novo utilizador
                </p>
                <p className="text-xs text-muted-foreground">
                  Crie um utilizador para o SIP com perfis e contact details.
                </p>
              </div>
              <div className="rounded-3xl border border-border/60 bg-background p-6 shadow-xs">
                <UserForm />
              </div>
            </div>
            <div className="rounded-3xl border border-border/60 bg-muted/40 p-6 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Boas práticas</p>
              <ul className="mt-4 space-y-3 list-disc pl-5">
                <li>Use email institucional sempre que possível.</li>
                <li>
                  Separe perfis com vírgula: ADMIN, INSTRUTOR, SECRETARIA.
                </li>
                <li>Desative usuários inativos para controlar o acesso.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <Tabs defaultValue="table">
            <div className="flex flex-col gap-4 border-b border-border/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Modo de exibição
                </p>
                <p className="text-xs text-muted-foreground">
                  Veja utilizadores em tabela ou cartões.
                </p>
              </div>

              <TabsList className="h-auto shrink-0 rounded-xl border border-border/50 bg-muted/50 p-1 dark:bg-muted/30">
                <TabsTrigger
                  value="table"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-xs data-[state=active]:ring-1 data-[state=active]:ring-border/40 dark:data-[state=active]:bg-card"
                >
                  <Table className="h-4 w-4" />
                  Tabela
                </TabsTrigger>
                <TabsTrigger
                  value="cards"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-xs data-[state=active]:ring-1 data-[state=active]:ring-border/40 dark:data-[state=active]:bg-card"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Cards
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="table" className="mt-0 p-6 lg:p-8">
              <div className="overflow-hidden rounded-3xl border border-border/60 bg-muted/40">
                <table className="min-w-full divide-y divide-border text-sm">
                  <thead className="bg-background text-left text-xs uppercase tracking-[.12em] text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Nome</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Perfis</th>
                      <th className="px-6 py-4">Ativo</th>
                      <th className="px-6 py-4">Criado em</th>
                      <th className="px-6 py-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-muted/60">
                        <td className="px-6 py-4 font-medium text-foreground">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 text-foreground">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {user.roles.map((role) => role.name).join(", ") ||
                            "—"}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {user.active ? "Sim" : "Não"}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString(
                                "pt-BR",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                },
                              )
                            : "—"}
                        </td>
                        <td className="px-6 py-4">
                          <UserTableActions id={user.id as unknown as string} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="cards" className="mt-0 p-6 lg:p-8">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {users.map((user) => (
                  <article
                    key={user.id}
                    className="overflow-hidden rounded-3xl border border-border/60 bg-background p-5 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-muted-foreground">
                          Utilizador
                        </p>
                        <h2 className="mt-2 text-lg font-semibold text-foreground">
                          {user.name}
                        </h2>
                      </div>
                      <div className="rounded-xl bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        ID {user.id}
                      </div>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <p>
                        <span className="font-semibold text-foreground">
                          Email:
                        </span>{" "}
                        {user.email}
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">
                          Perfis:
                        </span>{" "}
                        {user.roles.map((role) => role.name).join(", ") || "—"}
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">
                          Ativo:
                        </span>{" "}
                        {user.active ? "Sim" : "Não"}
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">
                          Criado em:
                        </span>{" "}
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                              "pt-BR",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              },
                            )
                          : "—"}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}
