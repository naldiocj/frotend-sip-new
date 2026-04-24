"use client";

import { useUser } from "@/hooks/user-context";
import { formatarDataExtenso } from "@/lib/date-utils";
import Image from "next/image";

/**
 * Interface adaptada para Auto de Reconhecimento Físico e Directo de Pessoa
 */
interface IData {
  preview: {
    processoNumero?: string;
    numeroFolha?: string;
    dataEmissao?: string;
    cidade?: string;
    unidadeSIC?: string; // Local onde se achava o SIC
    investigadorNome?: string;
    identificadorNome?: string; // Pessoa que vai reconhecer
    descricaoPreviaPessoa?: string; // Descrição física antes do ato
    justificativaConhecimento?: string; // Como conhece a pessoa ou reteve as características
    posicoesPerfilamento?: string; // Descrição das posições (ex: 1. João, 2. Pedro...)
    resultadoReconhecimento?: string; // O que o identificador disse após o ato
  };
}

export function AutoReconhecimentoFisicoEDirectoPessoaTemplate({
  preview,
}: IData) {
  const { user } = useUser();

  const emptyLine = (val?: string, length: number = 20) =>
    val || "_".repeat(length);

  return (
    <div className="rounded-2xl bg-muted/30 p-4 mx-auto lg:p-8 overflow-x-auto w-[210mm] min-h-[297mm]">
      <div className="mx-auto bg-white p-12 text-black shadow-lg font-serif">
        {/* Cabeçalho Oficial [cite: 469-472] */}
        <header className="text-center space-y-1">
          <div className="flex justify-center mb-2">
            <Image src="/insignia.jpg" alt="Insígnia" width={55} height={50} />
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
              Fls. {preview?.numeroFolha || "________"}
            </span>
          </div>

          <h3 className="text-md font-bold uppercase underline mt-4 leading-tight">
            AUTO DE RECONHECIMENTO FÍSICO E DIRECTO DE PESSOA
          </h3>
        </header>

        <div className="mt-8 text-[14px] leading-relaxed text-justify space-y-6">
          {/* Introdução [cite: 476-481] */}
          <p>
            Aos{" "}
            <strong>
              {preview?.dataEmissao
                ? formatarDataExtenso(new Date(preview.dataEmissao))
                : "__________ dias do mês de __________________ do ano__________"}
            </strong>
            , nesta cidade de <strong>{emptyLine(preview?.cidade, 25)}</strong>{" "}
            e S.I.C, onde se achava o
            <strong> {emptyLine(preview?.unidadeSIC, 50)}</strong>. Comigo
            <strong>
              {" "}
              {preview?.investigadorNome ||
                user?.name ||
                "_________________________________________"}
            </strong>
            . Aqui compareceu depois de devidamente interpelado{" "}
            <strong>{emptyLine(preview?.identificadorNome, 50)}</strong>, para
            efeito de reconhecimento físico e directo.
          </p>

          {/* Fase 1: Descrição Prévia [cite: 482-488] */}
          <div className="space-y-2">
            <p>Descreveu a pessoa a identificar como sendo:</p>
            <div className="">{preview?.descricaoPreviaPessoa || ""}</div>
          </div>

          {/* Fase 2: Justificação [cite: 489-498] */}
          <div className="space-y-2">
            <p>
              Instado se antes já tinha visto a pessoa a identificar, ou lhe
              fora descrito, ou como conseguiu reter estas características,
              disse:
            </p>
            <div className="">{preview?.justificativaConhecimento || ""}</div>
          </div>

          <div className="space-y-2">
            <p>
              Em seguida encaminhou-se a pessoa de proceder a identificação a
              sala própria para o efeito, onde se encontrava o indivíduo a ser
              reconhecido, com os demais participantes ao acto, perfilados da
              esquerda para a direita, ocupando as seguintes posições:
            </p>
            <div className="">{preview?.posicoesPerfilamento || ""}</div>
          </div>

          {/* Resultado Final [cite: 510-514] */}
          <div className="space-y-2">
            <p>
              Na sequência, o identificador após ter olhado atentamente e no
              tempo que achou conveniente disse:
            </p>
            <div className="">{preview?.resultadoReconhecimento || ""}</div>
          </div>

          <p className="pt-4">
            E para constar lavrou-se o presente auto que vai ser devidamente
            assinado.
          </p>
        </div>

        {/* Rodapé e Assinaturas */}
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
            <span>Mod. 09</span>
            <span>SIC - Documento Oficial</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
