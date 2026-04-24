import { getCategorias } from "@/app/services/categoria.service";
import { CategoriaDTO } from "@/lib/dto/categoria.dto";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, LayoutGrid, Table } from "lucide-react";
import { convertData } from "@/lib/date-utils";

export const dynamic = "force-dynamic";

export default async function Page() {
  const categorias: CategoriaDTO[] = await getCategorias();

  return (
    <main className="bg-background px-4">
      <div className="flex flex-col gap-6">
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Catálogo de Categorias
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Categorias cadastradas
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte e gerencie as categorias do SIP para manter o cadastro
                de processos e registros alinhados.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Total de categorias
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {categorias.length}{" "}
                  {categorias.length === 1 ? "categoria" : "categorias"}
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
                  Alterna entre tabela e visualização em cartões.
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
                      <th className="px-6 py-4">Criado em</th>
                      <th className="px-6 py-4">Atualizado em</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {categorias.map((categoria) => (
                      <tr key={categoria.id} className="hover:bg-muted/60">
                        <td className="px-6 py-4 font-medium text-foreground">
                          {categoria.id}
                        </td>
                        <td className="px-6 py-4 text-foreground">
                          {categoria.nome}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {convertData(categoria.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {convertData(categoria.updatedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="cards" className="mt-0 p-6 lg:p-8">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {categorias.map((categoria) => (
                  <article
                    key={categoria.id}
                    className="overflow-hidden rounded-3xl border border-border/60 bg-background p-5 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-muted-foreground">
                          Categoria
                        </p>
                        <h2 className="mt-2 text-lg font-semibold text-foreground">
                          {categoria.nome}
                        </h2>
                      </div>
                      <div className="rounded-xl bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        ID {categoria.id}
                      </div>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <p>
                        <span className="font-semibold text-foreground">
                          Criado:
                        </span>{" "}
                        {new Date(categoria.createdAt).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          },
                        )}
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">
                          Atualizado:
                        </span>{" "}
                        {new Date(categoria.updatedAt).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          },
                        )}
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
