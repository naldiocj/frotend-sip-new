"use client";

import { useUser } from "@/hooks/user-context";
import { formatarDataExtenso } from "@/lib/date-utils";
import Image from "next/image";

/**
 * Interface adaptada para Auto de Exame Directo e Avaliação
 */
interface IData {
  preview: {
    processoNumero?: string;
    numeroFolha?: string;
    dataEmissao?: string;
    cidade?: string;
    unidadeSIC?: string;
    investigadorNome?: string;
    peritosNomes?: string; // Nomes dos peritos (especialistas ou louvados)
    objectoAvaliacao?: string; // Descrição do bem a examinar e avaliar
    resultadoExameAvaliacao?: string; // Descrição técnica e valor atribuído
  };
}

export function AutoExameAvaliacaoTemplate({ preview }: IData) {
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
            AUTO DE EXAME DIRECTO E AVALIAÇÃO
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
            , nesta cidade de{" "}
            <strong className="break-all">
              {emptyLine(preview?.cidade, 25)}
            </strong>{" "}
            e S.I.C, onde se achava o
            <strong className="break-all">
              {" "}
              {emptyLine(preview?.unidadeSIC, 50)}
            </strong>
            . Comigo
            <strong>
              {" "}
              {preview?.investigadorNome ||
                user?.name ||
                "_________________________________________"}
            </strong>
            .
          </p>

          {/* Nomeação dos Peritos e Objecto */}
          <p>
            Aqui foram presentes os peritos previamente notificados
            <strong className="break-all">
              {" "}
              {emptyLine(preview?.peritosNomes, 80)}
            </strong>
            , a fim de procederem o exame e avaliação em{" "}
            <strong>{emptyLine(preview?.objectoAvaliacao, 60)}</strong> e
            declararem o que for digno de observação.
          </p>

          {/* Juramento e Corpo do Exame/Avaliação */}
          <div className="space-y-4">
            <p>
              Prestado em forma legal o juramento que lhes foi deferido de bem
              desempenharem as funções que lhes foram confiadas, passaram logo
              ao exame e avaliação, findo o qual declararam:
            </p>

            <div className="min-h-[100px] border-l-2 border-slate-100 pl-4 whitespace-pre-wrap leading-loose text-justify break-all">
              <strong>
                {emptyLine(preview?.resultadoExameAvaliacao, 360)}
              </strong>
            </div>
          </div>

          <p className="pt-4">
            E para constar lavrou-se o presente auto que vai ser devidamente
            assinado.
          </p>
        </div>

        {/* Assinaturas */}
        <footer className="mt-20">
          <div className="grid grid-cols-2 gap-12 text-center text-[11px] font-bold uppercase">
            <div className="space-y-4">
              <div className="border-b border-black w-full" />
              <p>OS PERITOS</p>
            </div>
            <div className="space-y-4">
              <div className="border-b border-black w-full" />
              <p>O INVESTIGADOR CRIMINAL</p>
            </div>
          </div>

          <div className="mt-16 flex justify-between items-end text-[9px] text-slate-400 font-sans italic">
            <span>Modelo SIC - Exame e Avaliação</span>
            <span className="font-bold text-black/20">CONFIDENCIAL</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
