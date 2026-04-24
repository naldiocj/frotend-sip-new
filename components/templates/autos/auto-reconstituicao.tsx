"use client";

import { useUser } from "@/hooks/user-context";
import { formatarDataExtenso } from "@/lib/date-utils";
import Image from "next/image";

/**
 * Interface adaptada para Auto de Reconstituição
 */
interface IData {
  preview: {
    processoNumero?: string;
    numeroFolha?: string;
    dataEmissao?: string;
    cidade?: string;
    unidadeSIC?: string;
    investigadorNome?: string;
    peritosNomes?: string; // Peritos que prestaram juramento
    intervenientesNomes?: string; // Arguidos, vítimas ou testemunhas presentes
    horaInicioTermino?: string; // Horário da diligência
    descricaoReconstituicao?: string; // Relato detalhado do ato
  };
}

export function AutoReconstituicaoTemplate({ preview }: IData) {
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
          <h2 className="text-sm font-bold uppercase">
            Serviço de Investigação Criminal
          </h2>

          <div className="pt-6 flex justify-end">
            <span className="text-xs border-b border-black px-2">
              Fls. {preview?.numeroFolha || "_________"}
            </span>
          </div>

          <h3 className="text-lg font-bold uppercase underline mt-4">
            AUTO DE RECONSTITUIÇÃO
          </h3>
        </header>

        <div className="mt-8 text-[14px] leading-relaxed text-justify space-y-6">
          {/* Introdução */}
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
            .
          </p>

          {/* Peritos */}
          <p>
            Os peritos previamente notificados{" "}
            <strong>{emptyLine(preview?.peritosNomes, 80)}</strong>, que
            prestaram de forma legal o juramento que lhes foi deferido de bem
            desempenharem as funções confiadas.
          </p>

          {/* Intervenientes */}
          <p>
            Aqui compareceu depois de notificado:{" "}
            <strong>{emptyLine(preview?.intervenientesNomes, 80)}</strong>,
            intervenientes no acto.
          </p>

          {/* Tempo e Descrição */}
          <p>
            <strong>INICIO E TÉRMINO:</strong>{" "}
            {emptyLine(preview?.horaInicioTermino, 40)}
          </p>

          <div className="space-y-4">
            <p className="font-bold underline">DESCRIÇÃO DO ACTO:</p>
            <div className="min-h-[50px] border-l-2 border-slate-100 pl-4 italic whitespace-pre-wrap leading-relaxed break-all">
              {preview?.descricaoReconstituicao ||
                "________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________"}
            </div>
          </div>

          <p className="pt-4">
            E para constar lavrou-se o presente auto que vai ser devidamente
            assinado.
          </p>
        </div>

        {/* Assinaturas */}
        <footer className="mt-16">
          <div className="grid grid-cols-2 gap-8 text-center text-[10px] font-bold uppercase">
            <div className="space-y-4">
              <div className="border-b border-black w-full" />
              <p>OS PERITOS</p>
            </div>
            <div className="space-y-4">
              <div className="border-b border-black w-full" />
              <p>O INVESTIGADOR CRIMINAL</p>
            </div>
            <div className="space-y-4 col-span-2 w-1/2 mx-auto mt-4">
              <div className="border-b border-black w-full" />
              <p>OS INTERVENIENTES</p>
            </div>
          </div>

          <div className="mt-10 flex justify-end text-[9px] text-slate-400 font-sans italic">
            <span>SIC - Modelo de Reconstituição de Factos</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
