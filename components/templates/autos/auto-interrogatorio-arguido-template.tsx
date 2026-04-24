"use client";

import { useUser } from "@/hooks/user-context";
import {
  calcularIdade,
  formatarDataExtenso,
  formatarDataNascido,
} from "@/lib/date-utils";
import Image from "next/image";

/**
 * Interface para Auto de Interrogatório de Arguido
 */
interface IData {
  preview: {
    processoNumero?: string;
    numeroFolha?: string;
    dataEmissao?: string;
    enderecoCidade?: string;
    descricaoOndeSeAchava?: string;
    defensorNome?: string;
    arguidoNome?: string;
    arguidoPai?: string;
    arguidoMae?: string;
    arguidoEstadoCivil?: string;
    arguidoDataNascimento?: string;
    arguidoNaturalidade?: string;
    arguidoProfissao?: string;
    arguidoBI?: string;
    arguidoBIEmissao?: string;
    arguidoBILocal?: string;
    arguidoEmail?: string;
    arguidoTelefone?: string;
    arguidoProvincia?: string;
    arguidoMunicipio?: string;
    arguidoBairro?: string;
    arguidoRua?: string;
    arguidoCasaNumero?: string;
    antecedentesCriminais?: string; // Resposta sobre prisões anteriores
    materiaAutosResposta?: string; // Conteúdo do interrogatório
  };
}

export function AutoInterrogatorioArguidoTemplate({ preview }: IData) {
  const { user } = useUser();

  const emptyLine = (val?: string, length: number = 20) =>
    val || "_".repeat(length);

  return (
    <div className="rounded-2xl bg-muted/30 p-4 mx-auto lg:p-8 overflow-x-auto w-[210mm] min-h-[297mm]">
      <div className="mx-auto min-h-[297mm]] bg-white p-12 text-black shadow-lg font-serif">
        {/* Cabeçalho Oficial [cite: 317-321] */}
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
            Serviço Provincial de Investigação
          </h2>

          <div className="pt-6 flex justify-between items-end">
            <span className="text-xs border-b border-black px-2">
              Fls. {preview?.numeroFolha || "______"}
            </span>
          </div>

          <h3 className="text-lg font-bold uppercase underline mt-4">
            AUTO DE INTERROGATÓRIO DE ARGUIDO
          </h3>
        </header>

        <div className="mt-8 text-[14px] leading-relaxed text-justify space-y-4">
          {/* Introdução e Defensor [cite: 324-330] */}
          <p>
            Aos{" "}
            <strong>
              {preview?.dataEmissao
                ? formatarDataExtenso(new Date(preview.dataEmissao))
                : "__________ dias do mês de __________________ do ano__________"}
            </strong>
            , nesta cidade de{" "}
            <strong>{emptyLine(preview?.enderecoCidade, 25)}</strong> e S.I.C,
            onde se achava o
            <strong> {emptyLine(preview?.descricaoOndeSeAchava, 40)}</strong> e
            o defensor
            <strong> {emptyLine(preview?.defensorNome, 40)}</strong> comigo
            <strong> {user?.name || "_".repeat(50)}</strong>.
          </p>

          {/* Advertência e Identificação [cite: 331-342] */}
          <p>
            Aqui foi presente o arguido{" "}
            <strong>{emptyLine(preview?.arguidoNome, 30)}</strong> que depois de
            advertido que a falta de resposta às perguntas sobre a sua
            identidade e antecedentes criminais o fará incorrer na pena de
            desobediência e a sua falsidade na pena de falsas declarações, disse
            chamar-se
            <strong> {emptyLine(preview?.arguidoNome, 40)}</strong>, filho de
            <strong> {emptyLine(preview?.arguidoPai, 30)}</strong> e de
            <strong> {emptyLine(preview?.arguidoMae, 30)}</strong>, no estado de
            <strong> {emptyLine(preview?.arguidoEstadoCivil, 15)}</strong>, de
            <strong>
              {" "}
              {preview?.arguidoDataNascimento
                ? calcularIdade(new Date(preview.arguidoDataNascimento))
                : "____"}{" "}
            </strong>
            anos de idade, nascido em{" "}
            <strong>
              {preview?.arguidoDataNascimento
                ? formatarDataNascido(new Date(preview.arguidoDataNascimento))
                : "____ de __________ de ________"}
            </strong>
            , natural de{" "}
            <strong>{emptyLine(preview?.arguidoNaturalidade, 25)}</strong>, de
            profissão ou ocupação
            <strong> {emptyLine(preview?.arguidoProfissao, 25)}</strong>,
            titular do B.I. nº
            <strong> {emptyLine(preview?.arguidoBI, 20)}</strong> emitido em{" "}
            <strong>{emptyLine(preview?.arguidoBIEmissao, 15)}</strong>, por{" "}
            <strong>{emptyLine(preview?.arguidoBILocal, 25)}</strong>, utente do
            e-mail
            <strong> {emptyLine(preview?.arguidoEmail, 30)}</strong> e terminal
            telefónico
            <strong> {emptyLine(preview?.arguidoTelefone, 20)}</strong>,
            residente na província
            <strong> {emptyLine(preview?.arguidoProvincia, 20)}</strong>{" "}
            município de
            <strong> {emptyLine(preview?.arguidoMunicipio, 20)}</strong>, bairro
            <strong> {emptyLine(preview?.arguidoBairro, 20)}</strong> rua
            <strong> {emptyLine(preview?.arguidoRua, 20)}</strong> casa nº
            <strong> {emptyLine(preview?.arguidoCasaNumero, 10)}</strong>.
          </p>

          {/* Perguntas sobre Antecedentes [cite: 344-346] */}
          <div className="space-y-2">
            <p className="font-bold">
              Perguntado se já esteve preso ou respondeu em juízo, quando e
              porquê, se foi ou não condenado e por que crimes.
            </p>
            <p className="whitespace-pre-wrap break-all">
              <strong>RESPONDEU:</strong>{" "}
              {preview?.antecedentesCriminais ||
                "________________________________________________________________________________________________________________________________"}
            </p>
          </div>

          {/* Interrogatório e Direito ao Silêncio [cite: 345, 352] */}
          <div className="space-y-2 pt-2">
            <p>
              Seguidamente, interrogado sobre os factos que lhe são imputados,
              que acabam de ser expostos, depois de esclarecido que{" "}
              <strong>não é obrigado a responder as perguntas</strong> que lhe
              vão ser feitas sobre esses factos ou sobre o conteúdo das
              declarações que acerca deles prestar.
            </p>
            <p className="font-bold underline uppercase">
              À MATÉRIA DOS AUTOS, RESPONDEU:
            </p>
            <div className="min-h-[250px] border-l-2 border-slate-100 pl-4 whitespace-pre-wrap break-all">
              {preview?.materiaAutosResposta ||
                "________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________"}
            </div>
          </div>
        </div>

        {/* Rodapé e Assinaturas */}
        <footer className="mt-16">
          <div className="grid grid-cols-2 gap-8 text-center text-[10px] font-bold uppercase">
            <div className="space-y-4">
              <div className="border-b border-black w-full" />
              <p>O INSTRUTOR</p>
            </div>
            <div className="space-y-4">
              <div className="border-b border-black w-full" />
              <p>O ARGUIDO</p>
            </div>
            <div className="space-y-4 col-span-2 w-1/2 mx-auto mt-4">
              <div className="border-b border-black w-full" />
              <p>O DEFENSOR</p>
            </div>
          </div>

          <div className="mt-10 flex justify-between items-end text-[9px] text-slate-400 font-sans">
            <span>Mod. 02</span>
            <span className="uppercase">SIC - Documento Oficial</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
