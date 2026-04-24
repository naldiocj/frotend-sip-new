"use client";

import { useUser } from "@/hooks/user-context";
import {
  calcularIdade,
  formatarDataExtenso,
  formatarDataNascido,
} from "@/lib/date-utils";
import Image from "next/image";

/**
 * Interface adaptada para Auto de Corpo de Delito Indirecto
 */
interface IData {
  preview: {
    processoNumero?: string;
    numeroFolha?: string;
    dataEmissao?: string;
    cidade?: string;
    unidadeSIC?: string;
    chefeDepartamento?: string; // Ex: Superintendente Chefe
    investigadorNome?: string;
    testemunhaNome?: string;
    testemunhaIdade?: string;
    testemunhaDataNascimento?: string;
    testemunhaEstadoCivil?: string;
    testemunhaProfissao?: string;
    testemunhaPai?: string;
    testemunhaMae?: string;
    testemunhaNaturalidade?: string;
    testemunhaEndereco?: string;
    testemunhaTelefone?: string;
    depoimentoConteudo?: string;
  };
}

export function AutoCorpoDelitoIndirectoTemplate({ preview }: IData) {
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
            AUTO DE CORPO DE DELITO INDIRECTO
          </h3>
        </header>

        <div className="mt-8 text-[14px] leading-relaxed text-justify space-y-5">
          {/* Introdução com Autoridade Responsável */}
          <p>
            Aos{" "}
            <strong>
              {preview?.dataEmissao
                ? formatarDataExtenso(new Date(preview.dataEmissao))
                : "__________ dias do mês de __________________ do ano__________"}
            </strong>{" "}
            , nesta cidade de{" "}
            <strong className="break-all">
              {emptyLine(preview?.cidade, 25)}
            </strong>{" "}
            e Serviço de Investigação Criminal, onde se achava o Excelentíssimo
            Senhor{" "}
            <strong className="break-all">
              {emptyLine(preview?.chefeDepartamento, 60)}
            </strong>
            .
          </p>

          <p>
            Comigo,{" "}
            <strong>
              {preview?.investigadorNome ||
                user?.name ||
                "____________________"}
            </strong>
            , Investigador Criminal dos presentes autos. Aqui, sendo presentes
            as testemunhas adiante referidas, recolheram à sala que lhes foi
            destinada, onde vieram a depor separadamente sobre os factos
            constantes dos autos, pela ordem e forma seguintes:
          </p>

          {/* Identificação da Testemunha */}
          <div className="pt-2">
            <p className="font-bold border-b border-black w-fit mb-2">
              1ª Testemunha
            </p>
            <p>
              Disse chamar-se{" "}
              <strong>{emptyLine(preview?.testemunhaNome, 50)}</strong>, de
              <strong>
                {" "}
                {preview?.testemunhaDataNascimento
                  ? calcularIdade(new Date(preview.testemunhaDataNascimento))
                  : "____"}{" "}
              </strong>{" "}
              anos de idade, nascido aos
              <strong>
                {" "}
                {preview?.testemunhaDataNascimento
                  ? formatarDataNascido(
                    new Date(preview.testemunhaDataNascimento),
                  )
                  : "____ de __________ de ________"}
              </strong>
              ,
              <strong className="break-all">
                {" "}
                {emptyLine(preview?.testemunhaEstadoCivil, 15)}
              </strong>{" "}
              e<strong> {emptyLine(preview?.testemunhaProfissao, 25)}</strong>{" "}
              de profissão, filho de
              <strong className="break-all">
                {" "}
                {emptyLine(preview?.testemunhaPai, 40)}
              </strong>{" "}
              e de
              <strong className="break-all">
                {" "}
                {emptyLine(preview?.testemunhaMae, 40)}
              </strong>
              , natural de
              <strong className="break-all">
                {" "}
                {emptyLine(preview?.testemunhaNaturalidade, 25)}
              </strong>
              , residente no
              <strong className="break-all">
                {" "}
                {emptyLine(preview?.testemunhaEndereco, 60)}
              </strong>
              , podendo ser contactado através do terminal telefónico
              <strong> {emptyLine(preview?.testemunhaTelefone, 20)}</strong>.
            </p>
          </div>

          {/* Juramento e Depoimento */}
          <div className="space-y-4">
            <p>
              Pelos factos que vem depor,{" "}
              <strong>jura dizer a verdade e só a verdade</strong> e aos bons
              costumes disse:
            </p>

            <div className="min-h-[50px] border-l-2 border-slate-100 pl-4 whitespace-pre-wrap leading-relaxed text-justify break-all">
              {emptyLine(preview?.depoimentoConteudo, 280)}
            </div>
          </div>

          <p className="pt-4">
            Lido o seu depoimento, o achou conforme, ratifica e vai assinar.
          </p>
        </div>

        {/* Assinaturas */}
        <footer className="mt-16">
          <div className="grid grid-cols-2 gap-12 text-center text-[11px] font-bold uppercase">
            <div className="space-y-4">
              <div className="border-b border-black w-full" />
              <p>A TESTEMUNHA</p>
            </div>
            <div className="space-y-4">
              <div className="border-b border-black w-full" />
              <p>O INVESTIGADOR CRIMINAL</p>
            </div>
          </div>

          <div className="mt-12 text-[9px] text-slate-400 font-sans space-y-1">
            <p className="font-bold text-black/40">NOTA TÉCNICA:</p>
            <p>
              As testemunhas prestam depoimento com base no que viram ou ouviram
              (Corpo de Delito Indirecto).
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
