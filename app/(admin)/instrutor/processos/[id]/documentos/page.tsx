import { FileText } from "lucide-react";
import { getProcessosDocumentos } from "@/app/services/processo.service";
import { DocumentosSearchSection } from "./_components/documentos-search-section";
import RegisterDocumentosModal from "./_components/@modals/register-documentos-modal";
import CarregarDocumentosModal from "./_components/@modals/carregar-documentos-modal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const documentos = await getProcessosDocumentos(id);

  return (
    <main className="bg-background">
      <div className="flex flex-col gap-6">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            {/* Left — title */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
                Gestão de Documentos
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Documentos do Processo
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Consulte, visualize e carregue documentos de forma organizada.
                Alterne entre o modo Cards e Tabela conforme o seu fluxo
                preferido.
              </p>
            </div>

            {/* Right — actions */}
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <RegisterDocumentosModal />
              <CarregarDocumentosModal />
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex items-center gap-6 border-t border-border/60 px-6 py-4 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-muted-foreground">
                  Total de documentos
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {documentos.length}{" "}
                  {documentos.length === 1 ? "documento" : "documentos"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content (Tabs) ─────────────────────────────────────────────── */}
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs ring-1 ring-foreground/5">
          <DocumentosSearchSection data={documentos} />
        </section>
      </div>
    </main>
  );
}
