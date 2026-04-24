"use client";

import { useUser } from "@/hooks/user-context";
import Image from "next/image";

/**
 * Interface adaptada para Capa de Processo Crime
 */
interface IData {
  preview: {
    anoProcesso?: string;
    processoNumeroPGR?: string;
    expedienteNumeroSIC?: string;
    magistradoMP?: string;
    instrutorProcessual?: string;
    crimeSuspeita?: string;
    queixosoOfendido?: string;
    arguidoNome?: string;
    dataAutuacao?: string;
    cidadeAutuacao?: string;
    escrivaoNome?: string;
    livroNumero?: string;
    folhaNumero?: string;
    seccaoRegisto?: string;
  };
}

export function CapaProcessoCrimeTemplate({ preview }: IData) {
  const { user } = useUser();

  const emptyLine = (val?: string, length: number = 20) =>
    val || "_".repeat(length);

  return (
    <div className="rounded-2xl bg-muted/30 p-4 lg:p-8 ">
      <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white p-12 text-black shadow-lg font-serif">
        <div className="border-8 border-black px-4 py-6">
          <header className="text-center space-y-1">
            <div className="flex justify-center mb-2">
              <Image
                src="/insignia.jpg"
                alt="Insígnia"
                width={70}
                height={65}
              />
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
            <div className="w-[85%] border-t border-black mt-4 flex mx-auto" />
          </header>

          <div className="mt-6 space-y-8 text-[14px]">
            {/* Números de Processo */}
            <div className="flex justify-center font-bold font-sans">
              <p>ANO DE {preview?.anoProcesso || "_____"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase">Processo Nº (PGR)</p>
                <div className="border-b border-black font-bold h-6">
                  {preview?.processoNumeroPGR}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-right">
                  Expediente Nº (SIC)
                </p>
                <div className="border-b border-black font-bold h-6 text-right">
                  {preview?.expedienteNumeroSIC}
                </div>
              </div>
            </div>

            {/* Responsáveis */}
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="text-center">
                <p className="text-[11px] font-bold mb-8">
                  Magistrado do Ministério Público
                </p>
                <div className="border-b border-black w-full" />
                <p className="text-[10px] mt-1">
                  {emptyLine(preview?.magistradoMP, 40)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-bold mb-8">
                  Instrutor Processual
                </p>
                <div className="border-b border-black w-full" />
                <p className="text-[10px] mt-1">
                  {emptyLine(preview?.instrutorProcessual, 40)}
                </p>
              </div>
            </div>

            {/* Dados do Crime */}
            <div className="space-y-6 pt-5 text-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest bg-slate-100 py-1">
                  Auto por Suspeita do Crime
                </p>
                <p className="font-bold text-lg min-h-[50px] flex items-center justify-center border-b border-black break-all">
                  {preview?.crimeSuspeita ||
                    "_________________________________________________"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase">
                  Queixoso ou Participante ou Ofendido
                </p>
                <p className="font-medium min-h-[40px] flex items-center justify-center border-b border-black">
                  {preview?.queixosoOfendido ||
                    "______________________________________________________"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase">Arguido</p>
                <p className="font-bold min-h-[40px] flex items-center justify-center border-b border-black uppercase">
                  {preview?.arguidoNome ||
                    "______________________________________________________"}
                </p>
              </div>
            </div>

            {/* Autuação (Parte Inferior) */}
            <div className="mt-0 pt-0">
              <h3 className="font-bold text-center underline mb-4">AUTUAÇÃO</h3>
              <p className="text-justify leading-relaxed">
                Aos <strong>{emptyLine(preview?.dataAutuacao, 30)}</strong>{" "}
                nesta cidade de
                <strong> {emptyLine(preview?.cidadeAutuacao, 30)}</strong> e
                S.I.C autuei o que segue. E eu,{" "}
                <strong>
                  {preview?.escrivaoNome ||
                    user?.name ||
                    "____________________________________"}
                </strong>
                , que escrevi e assino.
              </p>

              <div className="w-full border-b border-black mt-10 mb-8" />

              <p>
                Registado no livro nº{" "}
                <strong>{emptyLine(preview?.livroNumero, 10)}</strong> folha
                <strong> {emptyLine(preview?.folhaNumero, 10)}</strong> da
                <strong> {emptyLine(preview?.seccaoRegisto, 40)}</strong>.
              </p>

              <div className="flex justify-between items-end mt-12">
                <p className="text-xs">
                  _________________, ________ de ________________ de 20_______
                </p>
                <div className="text-center w-48">
                  <div className="border-b border-black w-full mb-1" />
                  <p className="text-[10px] font-bold">O ADMINISTRATIVO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
