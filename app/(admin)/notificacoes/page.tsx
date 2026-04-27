import { getNotificacoes } from "@/app/services/notificacao.service";
import SearchNotificacao from "@/components/table/search-notificacao";
import { searchParamsCache } from "@/lib/searchparams";
import { Bell, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { convertData } from "@/lib/date-utils";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { q, lida } = searchParamsCache.parse(await searchParams);
  const todas = await getNotificacoes(q, lida);
  const naoLidas = todas.filter((n) => !n.lida).length;

  const ITEMS_PER_PAGE = 5;
  const page = parseInt((await searchParams).page as string || "1");
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = todas.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(todas.length / ITEMS_PER_PAGE);

  return (
    <main className="bg-background px-4">
      <div className="flex flex-col gap-6">
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Instrução Processual
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Notificações
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Visualize as notificações do sistema.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-t border-border/60 px-6 py-4 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Total
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {todas.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 dark:bg-amber-500/15">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Não lidas
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {naoLidas}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="border-b border-border/60 px-6 py-4 lg:px-8">
            <SearchNotificacao />
          </div>

          <div className="flex flex-col">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Bell className="h-12 w-12 opacity-50" />
                <p className="mt-4 text-sm">Nenhuma notificação encontrada.</p>
              </div>
            ) : (
              paginated.map((notificacao) => (
                <a
                  key={notificacao.id}
                  href={notificacao.link || "#"}
                  className={`flex items-start gap-4 border-b border-border/60 p-4 transition-colors hover:bg-muted/50 last:border-0 ${
                    !notificacao.lida ? "bg-primary/5" : ""
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      notificacao.tipo === "URGENTE"
                        ? "bg-rose-500/10 text-rose-500"
                        : notificacao.tipo === "AVISO"
                          ? "bg-amber-500/10 text-amber-500"
                          : notificacao.tipo === "SUCESSO"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {notificacao.tipo === "URGENTE" ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : notificacao.tipo === "SUCESSO" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Info className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm font-medium ${
                          !notificacao.lida
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {notificacao.titulo}
                        {!notificacao.lida && (
                          <span className="ml-2 inline-block h-2 w-2 rounded-full bg-primary" />
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground shrink-0">
                        {convertData(notificacao.data as any)}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notificacao.mensagem}
                    </p>
                  </div>
                </a>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border/60 px-6 py-4">
              <p className="text-sm text-muted-foreground">
                Página {page} de {totalPages}
              </p>
              <div className="flex gap-2">
                <a
                  href={`?q=${q}&lida=${lida}&page=${Math.max(1, page - 1)}`}
                  className={`rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted ${
                    page <= 1 ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  Anterior
                </a>
                <a
                  href={`?q=${q}&lida=${lida}&page=${Math.min(totalPages, page + 1)}`}
                  className={`rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted ${
                    page >= totalPages ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  Próxima
                </a>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}