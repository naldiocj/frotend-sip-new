"use client";

import { useUser } from "@/hooks/user-context";
import { formatarDataExtenso } from "@/lib/date-utils";
import Image from "next/image";

/**
 * Interface adaptada para Auto de Constituição de Arguido
 */
interface IData {
  preview: {
    processoNumero?: string;
    numeroFolha?: string;
    label?: string; // Ex: AUTO DE CONSTITUIÇÃO DE ARGUIDO
    dataEmissao?: string;
    enderecoCidade?: string;
    descricaoOndeSeAchava?: string;
    arguidoNome?: string;
    crimeTipificacao?: string; // Factos constitutivos do crime
    advogadoDefensor?: string; // Nome do advogado ou defensor presente
  };
}

export function AutoConstituicaoArguidoTemplate({ preview }: IData) {
  const { user } = useUser();

  const emptyLine = (val?: string, length: number = 20) =>
    val || "_".repeat(length);

  return (
    <div className="rounded-2xl bg-muted/30 p-4 mx-auto lg:p-8 overflow-x-auto w-[210mm] min-h-[297mm]">
      <div className="mx-auto bg-white p-12 text-black shadow-lg font-serif">
        {/* Cabeçalho Oficial [cite: 294-297] */}
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

          <div className="pt-6 flex justify-between items-end">
            <span className="text-xs border-b border-black px-2">
              Fls. {preview?.numeroFolha || "______"}
            </span>
          </div>

          <h3 className="text-lg font-bold uppercase underline mt-4">
            {preview?.label || "AUTO DE CONSTITUIÇÃO DE ARGUIDO"}
          </h3>
        </header>

        {/* Corpo do Auto [cite: 301-305] */}
        <div className="mt-8 text-[14px] leading-relaxed text-justify space-y-6">
          <p>
            Aos{" "}
            <strong>
              {preview?.dataEmissao
                ? formatarDataExtenso(new Date(preview.dataEmissao))
                : "__________ dias do mês de __________________ do ano__________"}
            </strong>
            , nesta cidade de{" "}
            <strong>{emptyLine(preview?.enderecoCidade, 30)}</strong> e S.I.C,
            onde se achava o
            <strong> {emptyLine(preview?.descricaoOndeSeAchava, 60)}</strong>{" "}
            comigo
            <strong> {user?.name || "_".repeat(60)}</strong>.
          </p>

          {/* Fundamentação Legal e Identificação [cite: 306-307] */}
          <p>
            Nos termos do <strong>art.º 64º do Código do Processo Penal</strong>
            , foi o cidadão
            <strong> {emptyLine(preview?.arguidoNome, 60)}</strong>, constituído
            arguido no processo-crime nº{" "}
            <strong>
              {preview?.processoNumero || "_____________________"}
            </strong>
            , por factos constitutivos do crime{" "}
            <strong>{emptyLine(preview?.crimeTipificacao, 50)}</strong>, na
            presença do advogado ou defensor{" "}
            <strong>{emptyLine(preview?.advogadoDefensor, 50)}</strong>.
          </p>

          {/* Direitos e Deveres [cite: 309] */}
          <p>
            No mesmo acto procedeu-se a indicação dos direitos e deveres que lhe
            competem, nos termos dos
            <strong> artigos 67º e 68º do CPP</strong>.
            <span className="block mt-1 tracking-tighter opacity-50">
              - - - - - - - - - - - - - - - -
            </span>
          </p>

          <p className="pt-4">
            E para constar lavrou-se o presente auto que vai ser devidamente
            assinado.
          </p>

          {/* Linhas de preenchimento adicionais [cite: 312-315] */}
          <div className="space-y-4 pt-2">
            <div className="border-b border-black w-full h-4"></div>
            <div className="border-b border-black w-full h-4"></div>
          </div>
        </div>

        {/* Rodapé de Assinaturas */}
        <footer className="mt-20">
          <div className="grid grid-cols-2 gap-12 text-center text-xs font-bold uppercase">
            <div className="space-y-4">
              <div className="border-b border-black w-full mx-auto"></div>
              <p>O INSTRUTOR</p>
            </div>
            <div className="space-y-4">
              <div className="border-b border-black w-full mx-auto"></div>
              <p>O ARGUIDO</p>
            </div>
          </div>

          <div className="mt-16 flex justify-between items-end text-[10px] text-slate-400 font-sans">
            <span>Mod. 03</span>
            <span className="uppercase">SIC - Documento Oficial</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
