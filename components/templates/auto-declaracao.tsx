import Image from "next/image";

interface IData {
  preview: {
    processoNumero: string;
    label: string;
    dataEmissao: string;
    numeroFolha: string;
    tipoDeclaracao: string;
    materiaAutos: string;
    endereco: string;
    descricao: string;
  };
}

function formatPreviewDate(value: string) {
  if (!value) return "____/____/________";

  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function buildPreviewTitle(tipoDeclaracao: any) {
  if (tipoDeclaracao === "ADITAMENTO") {
    return "Auto de Declaração - Aditamento";
  }

  return "Auto de Declaração";
}

export function AutoDeclaracaoTemplate({ preview }: IData) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-4 shadow-xs ring-1 ring-foreground/5 lg:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
            Pré-visualização
          </p>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            Documento em formato A4
          </h3>
        </div>
        <div className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          Processo #{preview?.processoNumero || "—"}
        </div>
      </div>

      <div className="overflow-auto rounded-2xl bg-muted/30 p-4 lg:p-8">
        <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white p-10 text-black shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
          <div className="flex min-h-full flex-col gap-8">
            <header className="space-y-5 border-b border-slate-200 pb-6 text-center">
              <div className="flex justify-center mb-3">
                <Image
                  className="p-0"
                  src="/insignia.jpg"
                  alt="Insignia da República"
                  width={60}
                  height={50}
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 leading-2">
                República de Angola
                <span className="block h-2"></span>
                Ministério do Interior
                <span className="block h-2"></span>
                Serviço de Investigação Criminal
              </p>

              <div className="space-y-2 mt-14">
                <h4 className="text-2xl font-bold uppercase tracking-wide text-slate-900">
                  {preview?.label}
                </h4>
                <p className="text-sm text-slate-600">
                  Processo n.º {preview?.processoNumero || "________________"}
                </p>
              </div>
            </header>

            <div className="space-y-6 text-[15px] leading-8 text-slate-800">
              <p>
                Aos {formatPreviewDate(preview?.dataEmissao || "")}, nesta
                unidade de instrução processual, foi lavrado o presente auto
                referente à folha n.º {preview?.numeroFolha || "________"}.
              </p>

              <p>
                O presente termo é elaborado no âmbito do processo identificado
                pelo número {preview?.processoNumero || "________________"}, na
                modalidade{" "}
                {preview?.tipoDeclaracao === "ADITAMENTO"
                  ? "de aditamento"
                  : "inicial"}
                .
              </p>

              <p className="text-justify">
                Quanto à matéria dos autos, consta:{" "}
                {preview?.materiaAutos ||
                  "____________________________________________________________"}
                .
              </p>

              <p>
                O endereço relacionado aos factos ou à diligência é:{" "}
                {preview?.endereco ||
                  "____________________________________________________________"}
                .
              </p>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Declaração
                </p>
                <p className="mt-3 whitespace-pre-wrap">
                  {preview?.descricao ||
                    "O conteúdo descritivo da declaração aparecerá aqui à medida que o formulário for preenchido."}
                </p>
              </div>
            </div>

            <footer className="mt-auto space-y-10 pt-12 text-sm text-slate-700">
              <div className="grid gap-10 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="border-b border-slate-400" />
                  <p className="text-center font-medium">Instrutor</p>
                </div>
                <div className="space-y-2">
                  <div className="border-b border-slate-400" />
                  <p className="text-center font-medium">Declarante</p>
                </div>
              </div>

              <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500">
                Documento gerado a partir do editor de auto de declaração
              </p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
