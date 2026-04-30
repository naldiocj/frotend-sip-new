import { getDireccoes } from "@/app/services/direccao.service";
import { getProcessos } from "@/app/services/processo.service";
import { convertData } from "@/lib/date-utils";
import { Compass } from "lucide-react";
import { Suspense } from "react";
import { AtribuirDirecaoModal } from "./_components/@modals/atribuir-direcao-modal";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id?: string }>;
}

export default async function Page({ params }: PageProps) {
  const idParams = await params;
  const [direccoes, processos] = await Promise.all([
    getDireccoes(),
    getProcessos(),
  ]);

  if (idParams?.id) {
    const direccao = direccoes.find((d) => d.id === Number(idParams.id));
    if (direccao) {
      return (
        <main className="p-8">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold">{direccao.nome}</h2>
            <p className="text-muted-foreground">{direccao.sigla}</p>
            <p className="text-sm text-muted-foreground mt-2">{direccao.descricao}</p>
            <p className="text-xs text-muted-foreground mt-4">
              Criado em: {direccao.createdAt ? convertData(direccao.createdAt) : "—"} | 
              Atualizado em: {direccao.updatedAt ? convertData(direccao.updatedAt) : "—"}
            </p>
          </div>
        </main>
      );
    }
  }

  return (
    <main className="bg-background px-4">
      <div className="flex flex-col gap-6">
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Gestao de Direccoes
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Direccoes cadastradas
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Veja as direccoes do SIP e mantenha o cadastro atualizado para o
                suporte as rotinas processuais e de instrucao.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Suspense>
                <AtribuirDirecaoModal
                  direccoesPromise={Promise.resolve(direccoes)}
                  processosPromise={Promise.resolve(processos)}
                />
              </Suspense>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Compass className="h-4 w-4" />
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="p-6 lg:p-8">
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-muted/40">
              <table className="min-w-full divide-y divide-border text-sm">
                <thead className="bg-background text-left text-xs uppercase tracking-[.12em] text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Nome</th>
                    <th className="px-6 py-4">Sigla</th>
                    <th className="px-6 py-4">Atualizado em</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {direccoes.map((direccao) => (
                    <tr key={direccao.id} className="hover:bg-muted/60">
                      <td className="px-6 py-4 font-medium text-foreground">
                        {direccao.id}
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        {direccao.nome}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {direccao.sigla}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(direccao.updatedAt).toLocaleDateString(
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
          </div>
        </section>
      </div>
    </main>
  );
}
