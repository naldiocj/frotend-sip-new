"use client";

import { useUser } from "@/hooks/user-context";
import {
  calcularIdade,
  formatarDataExtenso,
  formatarDataNascido,
} from "@/lib/date-utils";
import Image from "next/image";

/**
 * Interface de dados baseada no arquivo DOCX e no componente original
 */
interface IData {
  preview: {
    processoNumero?: string;
    numeroFolha?: string;
    label?: string; // Ex: AUTO DE DECLARAÇÕES
    tipoDeclaracao?: string;
    dataEmissao?: string;
    enderecoCidade?: string;
    descricaoOndeSeAchava?: string;
    declarante?: string;
    declarantePai?: string;
    declaranteMae?: string;
    declaranteEstadoCivil?: string;
    declaranteDataNascimento?: string;
    declaranteNaturalidade?: string;
    declaranteProfissao?: string;
    declaranteBI?: string;
    declaranteBIEmissao?: string;
    declaranteBILocal?: string;
    declaranteEmail?: string;
    declaranteTelefone?: string;
    declaranteProvincia?: string;
    declaranteMunicipio?: string;
    declaranteBairro?: string;
    declaranteRua?: string;
    declaranteCasaNumero?: string;
    materiaAutos?: string;
  };
}

export function AutoDeclaracaoTemplate({ preview }: IData) {
  const { user } = useUser();

  // Helpers para campos vazios (estilo DOCX)
  const emptyLine = (val?: string, length: number = 20) =>
    val || "_".repeat(length);

  return (
    <div className="rounded-2xl bg-muted/30 p-4 mx-auto lg:p-8 overflow-x-auto w-[210mm] min-h-[297mm]">
      <div className="mx-auto min-h-[297mm]] bg-white p-12 text-black shadow-lg font-serif">
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
            {preview?.label || "AUTO DE DECLARAÇÕES"}
          </h3>
        </header>

        {/* Corpo do Auto */}
        <div className="mt-8 text-[14px] leading-relaxed text-justify space-y-4">
          <p>
            {formatarDataExtenso(new Date(preview?.dataEmissao!))}, nesta cidade
            de <strong>{emptyLine(preview?.enderecoCidade, 30)}</strong> e
            S.I.C, onde se achava o{" "}
            <strong>{emptyLine(preview?.descricaoOndeSeAchava, 50)}</strong>.
          </p>

          <p>
            Comigo <strong>{user?.name || "_".repeat(60)}</strong>. Aqui
            compareceu depois de devidamente interpelado{" "}
            <strong>{emptyLine(preview?.declarante, 50)}</strong>, filho de{" "}
            <strong>{emptyLine(preview?.declarantePai, 40)}</strong> e de{" "}
            <strong>{emptyLine(preview?.declaranteMae, 40)}</strong>, no estado
            de <strong>{emptyLine(preview?.declaranteEstadoCivil, 15)}</strong>,
            de
            <strong>
              {" "}
              {preview?.declaranteDataNascimento
                ? calcularIdade(new Date(preview.declaranteDataNascimento))
                : "____"}{" "}
            </strong>
            anos de idade, nascido em{" "}
            <strong>
              {preview?.declaranteDataNascimento
                ? formatarDataNascido(
                  new Date(preview.declaranteDataNascimento),
                )
                : "____ de __________ de ________"}
            </strong>
            , natural de{" "}
            <strong>{emptyLine(preview?.declaranteNaturalidade, 25)}</strong>,
            de profissão ou ocupação
            <strong> {emptyLine(preview?.declaranteProfissao, 25)}</strong>, JÁ
            DEVIDAMENTE IDENTIFICADO, titular do B.I. nº
            <strong> {emptyLine(preview?.declaranteBI, 20)}</strong> emitido em{" "}
            <strong>{emptyLine(preview?.declaranteBIEmissao, 15)}</strong>, por{" "}
            <strong>{emptyLine(preview?.declaranteBILocal, 30)}</strong>, utente
            do e-mail
            <strong> {emptyLine(preview?.declaranteEmail, 30)}</strong> e
            terminal telefónico
            <strong> {emptyLine(preview?.declaranteTelefone, 20)}</strong>,
            residente na província
            <strong> {emptyLine(preview?.declaranteProvincia, 20)}</strong>{" "}
            município de
            <strong> {emptyLine(preview?.declaranteMunicipio, 20)}</strong>,
            bairro
            <strong> {emptyLine(preview?.declaranteBairro, 20)}</strong> rua
            <strong> {emptyLine(preview?.declaranteRua, 25)}</strong> casa nº
            <strong> {emptyLine(preview?.declaranteCasaNumero, 10)}</strong>.
          </p>

          <div className="pt-4">
            <p className="font-bold underline mb-2">
              A matéria dos autos, disse:
            </p>
            <div className="min-h-[200px] border-l-2 border-slate-100 pl-4 text-slate-800 whitespace-pre-wrap break-all">
              {preview?.materiaAutos ||
                "________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________"}
            </div>
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
              <p>O DECLARANTE</p>
            </div>
          </div>

          <div className="mt-16 flex justify-between items-end text-[10px] text-slate-400 font-sans">
            <span>Mod. 001 / Mod. 50</span>
            <span className="uppercase">SIC - Documento Oficial</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
