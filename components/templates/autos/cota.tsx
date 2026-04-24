"use client";

import { useUser } from "@/hooks/user-context";
import { formatarDataExtenso, formatarDataExtensoT } from "@/lib/date-utils";
import Image from "next/image";

/**
 * Interface adaptada para Cota e Termo de Juntada
 */
interface IData {
  preview: {
    processoNumero?: string;
    dataCota?: string;
    cidade?: string;
    descricaoDocumentos?: string; // Descrição do que está a ser juntado
    nomeFornecedor?: string; // Quem entregou os documentos (ex: o lesado)
    contextoEntrega?: string; // Explicação sobre a origem/relevância dos docs
    instrutorNome?: string;
  };
}

export function CotaTemplate({ preview }: IData) {
  const { user } = useUser();

  const emptyLine = (val?: string, length: number = 20) =>
    val || "_".repeat(length);

  return (
    <div className="rounded-2xl bg-muted/30 p-4 lg:p-8">
      <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white p-12 text-black shadow-lg font-serif">
        {/* Cabeçalho Oficial */}
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
          <h2 className="text-sm font-bold uppercase text-[12px]">
            Serviço de Investigação Criminal
          </h2>

          <h3 className="text-lg font-bold uppercase tracking-[0.3em] mt-10 mb-6">
            C O T A
          </h3>
        </header>

        <div className="mt-8 text-[15px] leading-relaxed text-justify space-y-8">
          {/* Texto da Cota */}
          <p className="indent-8">
            Consigno nos autos que juntei a estes{" "}
            <strong className="break-all">
              {emptyLine(preview?.descricaoDocumentos, 60)}
            </strong>
            , que me foi fornecido pelo{" "}
            <strong className="break-all">
              {emptyLine(preview?.nomeFornecedor, 40)}
            </strong>
            . Segundo este,{" "}
            <strong className="break-all">
              {preview?.contextoEntrega ||
                "________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________"}
            </strong>
            .
          </p>

          {/* Data e Assinatura da Cota */}
          <div className="pt-4">
            <p>
              {preview?.cidade || "Luanda"}, aos{" "}
              {preview?.dataCota
                ? formatarDataExtensoT(new Date(preview.dataCota))
                : "____ de __________ de 20___"}
              .
            </p>

            <div className="mt-12 text-center w-64">
              <p className="text-[11px] font-bold uppercase">
                O Instrutor Processual
              </p>
              <div className="border-b border-black w-full my-2" />
              <p className="text-xs uppercase font-bold">
                {preview?.instrutorNome ||
                  user?.name ||
                  "____________________________"}
              </p>
            </div>
          </div>

          {/* Termo de Juntada (Secção Separada) */}
          <div className="mt-0 pt-3">
            <h4 className="text-center font-bold text-md tracking-widest mb-8">
              = TERMO DE JUNTADA =
            </h4>

            <p className="indent-12">
              Aos{" "}
              <strong>
                {preview?.dataCota
                  ? formatarDataExtenso(new Date(preview.dataCota))
                  : "__________ dias do mês de __________________ do ano de dois mil e __________"}
              </strong>
              , juntei aos presentes autos os documentos acima referidos, que se
              segue.
            </p>

            <div className="mt-16 flex flex-col items-center">
              <p className="text-[11px] font-bold uppercase mb-2">
                O Instrutor Processual
              </p>
              <div className="border-b border-black w-64 my-1" />
              <p className="text-xs uppercase font-bold">
                {preview?.instrutorNome ||
                  user?.name ||
                  "____________________________"}
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé Administrativo */}
        <footer className="mt-24 flex justify-between items-end text-[9px] text-slate-400 font-sans italic">
          <span>SIC/IP-01</span>
          <span className="font-bold text-black/20 uppercase tracking-tighter">
            Documento de Instrução
          </span>
        </footer>
      </div>
    </div>
  );
}
