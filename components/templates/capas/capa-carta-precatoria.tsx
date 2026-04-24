"use client";

import { useUser } from "@/hooks/user-context";
import Image from "next/image";

/**
 * Interface adaptada para Capa de Carta Precatória
 */
interface IData {
  preview: {
    anoCarta?: string;
    precaotoriaNumero?: string;
    processoOrigemPGR?: string;
    instrutorProcessual?: string;
    crimeReferencia?: string;
    entidadeDeprecante?: string; // Quem solicita a diligência
    dataAutuacao?: string;
    cidadeAutuacao?: string;
    escrivaoNome?: string;
    livroNumero?: string;
    folhaNumero?: string;
    seccaoRegisto?: string;
  };
}

export function CapaCartaPrecatoriaTemplate({ preview }: IData) {
  const { user } = useUser();

  const emptyLine = (val?: string, length: number = 20) =>
    val || "_".repeat(length);

  return (
    <div className="rounded-2xl bg-muted/30 p-4 lg:p-8">
      <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white p-12 text-black shadow-lg font-serif border-2 border-black/10">
        {/* Cabeçalho Oficial */}
        <header className="text-center space-y-1">
          <div className="flex justify-center mb-2">
            <Image src="/insignia.jpg" alt="Insígnia" width={70} height={65} />
          </div>
          <h1 className="text-md font-bold uppercase tracking-widest">
            República de Angola
          </h1>
          <p className="text-xs font-bold">-------***------</p>
          <h2 className="text-md font-bold uppercase">
            Ministério do Interior
          </h2>
          <h2 className="text-md font-bold uppercase">
            Serviço de Investigação Criminal
          </h2>
          <div className="w-full border-t-2 border-black mt-4" />
        </header>

        <div className="mt-6 space-y-8 text-[14px]">
          {/* Identificação da Carta e Origem */}
          <div className="space-y-4">
            <p className="font-bold">
              ANO DE 20 {preview?.anoCarta || "_____"}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="uppercase text-[11px] font-bold whitespace-nowrap">
                  Carta Precatória Nº:
                </span>
                <div className="border-b border-black flex-1 font-bold">
                  {preview?.precaotoriaNumero}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="uppercase text-[11px] font-bold whitespace-nowrap">
                  Extraído do Processo Nº:
                </span>
                <div className="border-b border-black flex-1 font-bold">
                  {preview?.processoOrigemPGR}
                </div>
                <span className="font-bold">PGR</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="uppercase text-[11px] font-bold whitespace-nowrap">
                  Instrutor Processual:
                </span>
                <div className="border-b border-black flex-1">
                  {emptyLine(preview?.instrutorProcessual, 40)}
                </div>
              </div>
            </div>
          </div>

          {/* Dados do Crime e Deprecante */}
          <div className="space-y-10 pt-3 text-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest bg-slate-100 py-1">
                Carta Precatória do Crime
              </p>
              <p className="italic font-bold text-lg min-h-[60px] flex items-center justify-center border-b border-black">
                {preview?.crimeReferencia ||
                  "______________________________________________________"}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase">Deprecante</p>
              <p className="font-medium min-h-[50px] flex items-center justify-center border-b border-black uppercase">
                {preview?.entidadeDeprecante ||
                  "______________________________________________________"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">
                (Juízo ou Unidade Policial de Origem)
              </p>
            </div>
          </div>

          {/* Autuação (Recebimento na Unidade Destino) */}
          <div className="mt-0 pt-0">
            <h3 className="font-bold text-center underline mb-6">AUTUAÇÃO</h3>
            <p className="text-justify leading-relaxed">
              Aos <strong>{emptyLine(preview?.dataAutuacao, 25)}</strong> nesta
              cidade de
              <strong> {emptyLine(preview?.cidadeAutuacao, 30)}</strong> e S.I.C
              autuei o que segue. E eu,{" "}
              <strong>
                {preview?.escrivaoNome ||
                  user?.name ||
                  "____________________________________"}
              </strong>
              , que escrevi e assino.
            </p>

            <div className="w-full border-b border-black mt-12 mb-8" />

            <div className="grid grid-cols-3 gap-4 italic text-sm">
              <p>
                Registado no livro nº{" "}
                <strong>{emptyLine(preview?.livroNumero, 8)}</strong>
              </p>
              <p>
                Folha <strong>{emptyLine(preview?.folhaNumero, 8)}</strong>
              </p>
              <p>
                Da <strong>{emptyLine(preview?.seccaoRegisto, 15)}</strong>
              </p>
            </div>

            <div className="flex justify-between items-end mt-16">
              <p className="text-xs">
                _________________, ________ de ________________ de 20_______
              </p>
              <div className="text-center w-56">
                <div className="border-b border-black w-full mb-1" />
                <p className="text-[10px] font-bold">
                  O ADMINISTRATIVO / ESCRIVÃO
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé Interno */}
        <div className="mt-12 flex justify-between text-[8px] text-slate-400 font-sans uppercase tracking-tighter">
          <span>Serviço de Investigação Criminal</span>
          <span>Capa de Precatória - SIC/PGR</span>
        </div>
      </div>
    </div>
  );
}
