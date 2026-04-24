"use client";

import { useUser } from "@/hooks/user-context";
import {
  calcularIdade,
  formatarDataExtenso,
  formatarDataNascido,
} from "@/lib/date-utils";
import Image from "next/image";

/**
 * Interface adaptada para Auto de Depoimento Indirecto
 */
interface IData {
  preview: {
    processoNumero?: string;
    numeroFolha?: string;
    label?: string; // Ex: AUTO DE DEPOIMENTO INDIRECTO
    dataEmissao?: string;
    enderecoCidade?: string;
    descricaoOndeSeAchava?: string;
    testemunhaNome?: string;
    testemunhaPai?: string;
    testemunhaMae?: string;
    testemunhaEstadoCivil?: string;
    testemunhaDataNascimento?: string;
    testemunhaNaturalidade?: string;
    testemunhaProfissao?: string;
    testemunhaBI?: string;
    testemunhaBIEmissao?: string;
    testemunhaBILocal?: string;
    testemunhaEmail?: string;
    testemunhaTelefone?: string;
    testemunhaProvincia?: string;
    testemunhaMunicipio?: string;
    testemunhaBairro?: string;
    testemunhaRua?: string;
    testemunhaCasaNumero?: string;
    relacoesParentesco?: string;
    depoimentoConteudo?: string;
  };
}

export function AutoDepoimentoIndirectoTemplate({ preview }: IData) {
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

          <div className="pt-6 flex justify-between items-end">
            <span className="text-xs border-b border-black px-2">
              Fls. {preview?.numeroFolha || "______"}
            </span>
          </div>

          <h3 className="text-lg font-bold uppercase underline mt-4">
            {preview?.label || "AUTO DE DEPOIMENTO INDIRECTO"}
          </h3>
        </header>

        <div className="mt-8 text-[14px] leading-relaxed text-justify space-y-5">
          {/* Introdução */}
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
            <strong> {emptyLine(preview?.descricaoOndeSeAchava, 45)}</strong>{" "}
            comigo
            <strong> {user?.name || "_".repeat(50)}</strong>.
          </p>

          <p className="indent-8">
            Aqui foi presente a testemunha adiante referida, que recolhida à
            sala destinada, onde veio a depor sobre os factos constantes dos
            autos, pela ordem e forma que segue. - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - -
          </p>

          {/* Identificação da Testemunha */}
          <p>
            Disse chamar-se{" "}
            <strong>{emptyLine(preview?.testemunhaNome, 50)}</strong>, filho de{" "}
            <strong>{emptyLine(preview?.testemunhaPai, 35)}</strong> e de
            <strong> {emptyLine(preview?.testemunhaMae, 35)}</strong>, no estado
            de
            <strong> {emptyLine(preview?.testemunhaEstadoCivil, 15)}</strong>,
            de
            <strong>
              {" "}
              {preview?.testemunhaDataNascimento
                ? calcularIdade(new Date(preview.testemunhaDataNascimento))
                : "____"}{" "}
            </strong>
            anos de idade, nascido em{" "}
            <strong>
              {preview?.testemunhaDataNascimento
                ? formatarDataNascido(
                  new Date(preview.testemunhaDataNascimento),
                )
                : "____ de __________ de ________"}
            </strong>
            , natural de{" "}
            <strong>{emptyLine(preview?.testemunhaNaturalidade, 25)}</strong>,
            de profissão ou ocupação
            <strong> {emptyLine(preview?.testemunhaProfissao, 25)}</strong>,
            titular do B.I. nº
            <strong> {emptyLine(preview?.testemunhaBI, 20)}</strong> emitido em{" "}
            <strong>{emptyLine(preview?.testemunhaBIEmissao, 15)}</strong>, por{" "}
            <strong>{emptyLine(preview?.testemunhaBILocal, 25)}</strong>, utente
            do e-mail
            <strong> {emptyLine(preview?.testemunhaEmail, 30)}</strong> e
            terminal telefónico
            <strong> {emptyLine(preview?.testemunhaTelefone, 20)}</strong>,
            residente na província
            <strong> {emptyLine(preview?.testemunhaProvincia, 20)}</strong>{" "}
            município de
            <strong> {emptyLine(preview?.testemunhaMunicipio, 20)}</strong>,
            bairro
            <strong> {emptyLine(preview?.testemunhaBairro, 20)}</strong> rua
            <strong> {emptyLine(preview?.testemunhaRua, 20)}</strong> casa nº
            <strong> {emptyLine(preview?.testemunhaCasaNumero, 10)}</strong>.
          </p>

          {/* Relações de Parentesco */}
          <div>
            <p className="font-bold underline">
              Inquirida sobre as suas relações de parentesco ou outras, com o
              arguido, o ofendido, o assistente, as partes civis e outras
              testemunhas referiu:
            </p>
            <div className="min-h-[60px] border-l border-slate-200 pl-4 break-all">
              {preview?.relacoesParentesco ||
                "________________________________________________________________________________________________________________________________________________________________"}
            </div>
          </div>

          {/* Juramento e Depoimento */}
          <div>
            <p className="font-bold underline">
              Pelos factos que vem depor e ao juramento prestado neste acto,
              onde jurou pela sua honra dizer a verdade e só a verdade, aos bons
              costumes disse:
            </p>
            <div className="min-h-[300px] pt-2 whitespace-pre-wrap leading-loose break-all">
              {preview?.depoimentoConteudo ||
                "________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________"}
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <footer className="mt-12">
          <div className="grid grid-cols-2 gap-12 text-center text-xs font-bold uppercase">
            <div className="space-y-4">
              <div className="border-b border-black w-full" />
              <p>O INSTRUTOR</p>
            </div>
            <div className="space-y-4">
              <div className="border-b border-black w-full" />
              <p>A TESTEMUNHA</p>
            </div>
          </div>

          <div className="mt-12 flex justify-between items-end text-[9px] text-slate-400 font-sans">
            <span>Mod. 50</span>
            <span className="uppercase tracking-widest italic font-bold text-black/20">
              SIC - Documento Oficial
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
