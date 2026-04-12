import Link from "next/link";

interface UserPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailsPage({ params: { id } }: UserPageProps) {
  return (
    <main className="bg-background px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Edição de utilizador
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Utilizador {id}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Esta página está disponível como stub para futuras melhorias de
                edição. Por agora, volte à lista de utilizadores ou aguarde a
                implementação completa.
              </p>
            </div>
            <Link
              href="/admin/usuarios"
              className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Voltar à lista
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
