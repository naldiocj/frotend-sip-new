"use client";

import { useUser } from "@/hooks/user-context";
import Image from "next/image";

interface IData {
  preview: {
    processoNumero?: string;
    label?: string;
    direccaoCentral?: string;
    dataExtenso?: string;
    horaInicio?: string;
    cidade?: string;
    unidadeSIC?: string;
    investigadorNome?: string;
    acompanhanteNome?: string;
    localDestino?: string;
    objetivoDiligencia?: string;
    desenvolvimentoTexto?: string;
    resultadoDiligencia?: string;
    horaFim?: string;
    conclusaoTexto?: string;
  };
}

export function AutoDiligenciaTemplate({ preview }: IData) {
  const { user } = useUser();

  const emptyLine = (val?: string, length: number = 20) =>
    val || "_".repeat(length);

  return (
    <div className="rounded-2xl bg-muted/30 p-4 mx-auto lg:p-8 overflow-x-auto w-[210mm] min-h-[297mm]">
      <div className="mx-auto bg-white p-12 text-black shadow-lg font-serif">
        {/* Cabeçalho Oficial */}
        <header className="text-center space-y-1 mb-8">
          <div className="flex justify-center mb-2">
            <Image
              src="/insignia.jpg"
              alt="Insígnia"
              width={55}
              height={50}
              priority // Carrega logo para evitar erro no canvas
            />
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
          <h2 className="text-[11px] font-bold uppercase max-w-md mx-auto">
            {preview?.direccaoCentral ||
              "DIRECÇÃO CENTRAL DE COMBATE AOS CRIMES CONTRA O PATRIMÓNIO"}
          </h2>

          <h3 className="text-lg font-bold uppercase underline mt-6">
            {preview?.label || "AUTO DE DILIGÊNCIA"}
          </h3>
        </header>

        <div className="text-[14px] leading-relaxed text-justify space-y-8">
          <section>
            <h4 className="font-bold uppercase mb-2">INTRODUÇÃO</h4>
            <p>
              {preview?.dataExtenso ||
                "Aos __________ dias do mês de ______________ do ano de ____________"}
              , quando eram sensivelmente{" "}
              <strong>{preview?.horaInicio || "____H____m"}</strong>, nesta
              cidade de
              <strong> {emptyLine(preview?.cidade, 20)}</strong> e na
              <strong> {emptyLine(preview?.unidadeSIC, 40)}</strong>, eu
              <strong>
                {" "}
                {preview?.investigadorNome ||
                  user?.name ||
                  "____________________"}
              </strong>
              , Investigador Criminal, na companhia do colega{" "}
              <strong>{emptyLine(preview?.acompanhanteNome, 30)}</strong>,
              desloquei-me ao
              <strong> {emptyLine(preview?.localDestino, 50)}</strong>,
              {preview?.objetivoDiligencia ||
                " a fim de ali podermos realizar a diligência prevista nos termos do modo de elaboração."}{" "}
            </p>
          </section>

          <section>
            <h4 className="font-bold uppercase mb-2">DESENVOLVIMENTO</h4>
            <p className="whitespace-pre-wrap">
              {preview?.desenvolvimentoTexto ||
                "Posto no local, descrevemos aqui como decorreu a diligência..."}{" "}
            </p>
          </section>

          <section>
            <h4 className="font-bold uppercase mb-2">CONCLUSÃO</h4>
            <p>
              Para constar os actos executados, cujo resultado consideramos
              <strong>
                {" "}
                {preview?.resultadoDiligencia || "________________"}
              </strong>
              , quando eram
              <strong> {preview?.horaFim || "____H____m"}</strong>, demos por
              finda a diligência lavrando o presente auto que vai ser
              devidamente assinado.
            </p>
          </section>
        </div>

        <footer className="mt-24">
          <div className="grid grid-cols-1 gap-12 text-center text-xs font-bold uppercase w-1/2 mx-auto">
            <div className="space-y-4">
              <div className="border-b border-black w-full" />
              <p>O INSTRUTOR</p>
            </div>
            <div className="space-y-4 pt-4">
              <div className="border-b border-black w-full" />
              <p>O SUPERIOR HIERÁRQUICO / ENTIDADE QUE DETERMINOU</p>
            </div>
          </div>

          <div className="mt-10 flex justify-end text-[10px] text-slate-400 font-sans italic">
            <span>SIC - Modelo de Auto de Diligência</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
