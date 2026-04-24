"use client";

import { useUser } from "@/hooks/user-context";
import { formatarDataExtenso } from "@/lib/date-utils";
import Image from "next/image";

/**
 * Interface adaptada para Auto de Reconhecimento Físico e Directo de Objecto
 */
interface IData {
  preview: {
    processoNumero?: string;
    numeroFolha?: string;
    dataEmissao?: string;
    cidade?: string;
    unidadeSIC?: string;
    investigadorNome?: string;
    identificadorNome?: string;
    descricaoPreviaObjecto?: string; // Como a pessoa descreveu o objeto antes de ver
    justificativaConhecimento?: string; // Como reteve as características/se já viu antes
    numeroSinalizacao?: string; // Número atribuído ao objeto no alinhamento
    resultadoReconhecimento?: string; // Resposta após olhar atentamente
  };
}

export function AutoReconhecimentoFisicoEDirectoObjectoTemplate({
  preview,
}: IData) {
  const { user } = useUser();

  const emptyLine = (val?: string, length: number = 20) =>
    val || "_".repeat(length);

  return (
    <section className="min-h-screen rounded-2xl border border-border/60 bg-card p-4 shadow-xs lg:p-6">
      {/* Header UI de visualização */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-muted-foreground">
            Pré-visualização
          </p>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            Auto de Reconhecimento de Objecto
          </h3>
        </div>
        <div className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          Processo #{preview?.processoNumero || "—"}
        </div>
      </div>

      <div className="rounded-2xl bg-muted/30 p-4 lg:p-8">
        <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white p-12 text-black shadow-lg font-serif">
          {/* Cabeçalho Oficial [cite: 408-411] */}
          <header className="text-center space-y-1">
            <div className="flex justify-center mb-2">
              <Image
                src="/insignia.jpg"
                alt="Insígnia"
                width={55}
                height={50}
              />
            </div>
            <h1 className="text-sm font-bold uppercase tracking-widest">
              República de Angola
            </h1>
            <p className="text-xs font-bold">-------***------</p>
            <h2 className="text-sm font-bold uppercase">
              Ministério do Interior
            </h2>
            <h2 className="text-sm font-bold uppercase">
              Serviço de Investigação Criminal
            </h2>

            <div className="pt-6 flex justify-end">
              <span className="text-xs border-b border-black px-2">
                Fls. {preview?.numeroFolha || "_________"}
              </span>
            </div>

            <h3 className="text-md font-bold uppercase underline mt-4 leading-tight">
              AUTO DE RECONHECIMENTO FÍSICO E DIRECTO DE OBJECTO
            </h3>
          </header>

          <div className="mt-8 text-[14px] leading-relaxed text-justify space-y-6">
            {/* Introdução [cite: 415-420] */}
            <p>
              Aos{" "}
              <strong>
                {preview?.dataEmissao
                  ? formatarDataExtenso(new Date(preview.dataEmissao))
                  : "__________ dias do mês de __________________ do ano__________"}
              </strong>
              , nesta cidade de{" "}
              <strong>{emptyLine(preview?.cidade, 25)}</strong> e S.I.C, onde se
              achava o<strong> {emptyLine(preview?.unidadeSIC, 50)}</strong>.
              Comigo
              <strong>
                {" "}
                {preview?.investigadorNome ||
                  user?.name ||
                  "_________________________________________"}
              </strong>
              . Aqui compareceu depois de devidamente interpelado{" "}
              <strong>{emptyLine(preview?.identificadorNome, 50)}</strong>, para
              efeito de reconhecimento de objecto.
            </p>

            {/* Fase 1: Descrição Prévia [cite: 421-427] */}
            <div className="space-y-2">
              <p>Descreveu o mesmo como sendo:</p>
              <div className="">{preview?.descricaoPreviaObjecto || ""}</div>
            </div>

            <div className="space-y-2">
              <p>
                Instado se antes já tinha visto o objecto a identificar, ou lhe
                fora descrito, ou como conseguiu reter estas características,
                disse:
              </p>
              <div className="">{preview?.justificativaConhecimento || ""}</div>
            </div>

            {/* Fase 3: Procedimento de Reconhecimento [cite: 439-440] */}
            <p>
              Em seguida encaminhou-se a pessoa de proceder a identificação a
              sala própria para o efeito, onde se encontrava o objecto a
              identificar sinalizado com o número
              <strong> {emptyLine(preview?.numeroSinalizacao, 10)}</strong>,
              entre outros semelhantes ou parecidos.
            </p>

            <p>
              Na sequência o identificador após ter olhado atentamente e no
              tempo que achou conveniente disse:
            </p>

            <div className="">{preview?.resultadoReconhecimento || ""}</div>

            <p className="pt-4">
              E para constar lavrou-se o presente auto que vai ser devidamente
              assinado.
            </p>
          </div>

          {/* Assinaturas [baseado na estrutura padrão SIC] */}
          <footer className="mt-20">
            <div className="grid grid-cols-2 gap-12 text-center text-[11px] font-bold uppercase">
              <div className="space-y-4">
                <div className="border-b border-black w-full" />
                <p>O IDENTIFICADOR</p>
              </div>
              <div className="space-y-4">
                <div className="border-b border-black w-full" />
                <p>O INVESTIGADOR CRIMINAL</p>
              </div>
            </div>

            <div className="mt-16 flex justify-between items-end text-[9px] text-slate-400 font-sans italic">
              <span>Mod. 08 </span>
              <span>SIC - Documento Oficial</span>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
