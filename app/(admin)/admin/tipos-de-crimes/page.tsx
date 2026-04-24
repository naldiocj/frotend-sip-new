import { getTiposCrimes } from "@/app/services/tipo-crime.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, LayoutGrid, Table } from "lucide-react";
import { convertData } from "@/lib/date-utils";

export const dynamic = "force-dynamic";

export default async function Page() {
  const tiposCrimes = await getTiposCrimes();

  return (
    <main className="bg-background px-4">
      <div className="flex flex-col gap-6">
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Catálogo de Tipos de Crime
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Tipos de Crime cadastrados
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Visualize e administre os tipos de crime utilizados no SIP. Este
                painel ajuda a manter o catálogo atualizado para a instrução
                processual e a classificação correta de cada caso.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ClipboardList className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Total de registros
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {tiposCrimes.length}{" "}
                  {tiposCrimes.length === 1 ? "tipo" : "tipos"}
                </p>
              </div>
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
                  Lista ou cartões para consultar rapidamente os tipos de crime.
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
                      <th className="px-6 py-4">Descrição</th>
                      <th className="px-6 py-4">Artigo Penal</th>
                      <th className="px-6 py-4">Atualizado em</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {tiposCrimes.map((tipo) => (
                      <tr key={tipo.id} className="hover:bg-muted/60">
                        <td className="px-6 py-4 font-medium text-foreground">
                          {tipo.id}
                        </td>
                        <td className="px-6 py-4 text-foreground">
                          {tipo.descricao}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {tipo.artigoPenal || "—"}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {new Date(tipo.updatedAt).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="cards" className="mt-0 p-6 lg:p-8">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {tiposCrimes.map((tipo) => (
                  <article
                    key={tipo.id}
                    className="overflow-hidden rounded-3xl border border-border/60 bg-background p-5 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-muted-foreground">
                          Tipo de Crime
                        </p>
                        <h2 className="mt-2 text-lg font-semibold text-foreground">
                          {tipo.descricao}
                        </h2>
                      </div>
                      <div className="rounded-xl bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        ID {tipo.id}
                      </div>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <p>
                        <span className="font-semibold text-foreground">
                          Artigo:
                        </span>{" "}
                        {tipo.artigoPenal || "Não informado"}
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">
                          Atualizado:
                        </span>{" "}
                        {tipo.createdAt
                          ? convertData(tipo.createdAt)
                          : "Não informado"}
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
