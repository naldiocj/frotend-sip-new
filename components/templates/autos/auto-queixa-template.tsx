"use client";

import { useUser } from "@/hooks/user-context";
import { formatarDataExtenso } from "@/lib/date-utils";
import Image from "next/image";

/**
 * Interface adaptada para Auto de Queixa
 */
interface IData {
  preview: {
    label?: string;
    processoNumero?: string;
    dataEmissao?: string; // Data em que o auto é lavrado
    horaEmissao?: string;
    investigadorNome?: string;
    unidadeSIC?: string;
    queixosoDados?: string; // Identificação completa do queixoso
    contraQuem?: string; // Identificação do acusado
    acusacaoMotivo?: string; // Descrição dos factos/acusação
    testemunhas?: string; // Lista de testemunhas
    desejaProcedimento?: boolean; // Se deseja procedimento criminal
  };
}

export function AutoQueixaTemplate({ preview }: IData) {
  const { user } = useUser();

  const emptyLine = (val?: string, length: number = 20) =>
    val || "_".repeat(length);

  return (
    <div className="rounded-2xl bg-muted/30 p-4 mx-auto lg:p-8 overflow-x-auto w-[210mm] min-h-[297mm]">
      <div className="mx-auto bg-white p-12 text-black shadow-lg font-serif">
        {/* Cabeçalho Oficial [cite: 239-243] */}
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

          <h3 className="text-lg font-bold uppercase underline mt-10">
            AUTO DE QUEIXA
          </h3>
        </header>

        {/* Corpo do Auto [cite: 245-246] */}
        <div className="mt-8 text-[14px] leading-relaxed text-justify space-y-6">
          <p>
            Aos{" "}
            <strong>
              {preview?.dataEmissao
                ? formatarDataExtenso(new Date(preview.dataEmissao))
                : "__________ dias do mês de __________________ do ano de dois mil e vinte e cinco"}
            </strong>
            , pelas <strong>{emptyLine(preview?.horaEmissao, 10)}</strong>,
            perante mim
            <strong>
              {" "}
              {preview?.investigadorNome ||
                user?.name ||
                "_________________________________________"}
            </strong>
            , Investigador Criminal desta
            <strong> {emptyLine(preview?.unidadeSIC, 50)}</strong> do S.I.C.
          </p>

          {/* Secção Queixoso [cite: 247-253] */}
          <div className="flex gap-2">
            <span className="font-bold whitespace-nowrap">Queixou-se:</span>
            <div className="flex-1 border-b border-dotted border-black min-h-[1.5em]">
              {preview?.queixosoDados || ""}
            </div>
          </div>

          {/* Secção Contra [cite: 254-257] */}
          <div className="flex gap-2 mt-4">
            <span className="font-bold whitespace-nowrap">Contra:</span>
            <div className="flex-1 border-b border-dotted border-black min-h-[1.5em]">
              {preview?.contraQuem || ""}
            </div>
          </div>

          {/* Secção Acusação [cite: 258-265, 267-279] */}
          <div className="flex gap-2 mt-4">
            <span className="font-bold whitespace-nowrap">A quem acusa:</span>
            <div className="flex-1 border-b border-dotted border-black min-h-[1.5em] italic">
              {preview?.acusacaoMotivo || ""}
            </div>
          </div>

          {/* Secção Testemunhas [cite: 280-286] */}
          <div className="mt-6">
            <span className="font-bold">Testemunhas:</span>
            <div className="mt-1 whitespace-pre-wrap leading-loose break-all">
              {preview?.testemunhas ||
                "________________________________________________________________________________________________________________________________________________________________"}
            </div>
          </div>

          {/* Declaração de Procedimento  */}
          <p className="pt-4 italic">
            Perante os factos deseja o devido procedimento criminal e aproveita
            o momento para manifestar a vontade em constituir-se assistente nos
            autos.
          </p>

          <p className="pt-2">
            E para constar lavrei o este auto que vai por mim assinado.
            <span className="tracking-tighter opacity-50"> </span>
          </p>
        </div>

        {/* Rodapé de Assinaturas [cite: 291-292] */}
        <footer className="mt-20">
          <div className="grid grid-cols-2 gap-12 text-center text-[11px] font-bold uppercase">
            <div className="space-y-4">
              <p>O QUEIXOSO</p>
              <div className="border-b border-black w-full mx-auto" />
            </div>
            <div className="space-y-4">
              <p>O INVESTIGADOR CRIMINAL</p>
              <div className="border-b border-black w-full mx-auto" />
            </div>
          </div>

          <div className="mt-16 flex justify-between items-end text-[9px] text-slate-400 font-sans uppercase">
            <span>Mod. 15</span>
            <span>SIC - Documento Oficial</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
