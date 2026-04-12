import { APP_NAME } from "@/lib/constants";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroLogin() {
  return (
    <div
      className="relative hidden md:flex flex-col justify-between p-10 lg:p-12 border-r border-border bg-cover bg-center"
      style={{ backgroundImage: "url(/engineer.png)" }}
    >
      <div className="absolute inset-0 bg-slate-950/80"></div>
      <div className="relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-3"
          aria-label="Voltar para a página inicial"
        >
          <Image
            src="/sic.png"
            alt="SIP Logo"
            width={120}
            height={120}
            className="h-30 w-auto object-contain"
            priority
          />
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {APP_NAME}
          </h1>
        </Link>
        <h4 className="text-3xl font-bold leading-tight text-white">
          "Inteligência, Audácia e Lealdade"
        </h4>
      </div>

      <div className="max-w-md relative z-10">
        <h1 className="text-3xl font-bold leading-tight text-white">
          Digitalize e gerencie processos de instrução criminal com segurança.
        </h1>
        <p className="mt-3 text-gray-300">
          O SIP foca-se na gestão estruturada de diligências, documentos legais e
          fluxos auditáveis para perícias, instrução e secretaria.
        </p>

        <ul className="mt-6 space-y-3 text-sm text-gray-300">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
            <span>
              Fluxos de trabalho processuais centralizados e com
              rastreabilidade.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
            <span>
              Documentos e prazos organizados em um ambiente digital seguro.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
            <span>
              Auditoria e controle para equipes de investigação e tomada de
              decisão.
            </span>
          </li>
        </ul>
      </div>

      <div className="text-xs text-gray-400 relative z-10">
        © {new Date().getFullYear()} SIP | Sistema de Instrução Processual
      </div>
    </div>
  );
}
