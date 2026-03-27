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
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-3"
          aria-label="Voltar para a página inicial"
        >
          <Image
            src="/sic.png"
            alt="SIC Logo"
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
          "Inteligência - Audácia - Lealdade"
        </h4>
      </div>

      <div className="max-w-md relative z-10">
        <h1 className="text-3xl font-bold leading-tight text-white">
          Simplifique o suporte. Acelere soluções.
        </h1>
        <p className="mt-3 text-gray-300">
          Centralize chamados, ativos e pessoas em um único lugar. Visão 360º
          para uma operação mais ágil, colaborativa e previsível.
        </p>

        <ul className="mt-6 space-y-3 text-sm text-gray-300">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
            <span>
              SLAs claros e notificações inteligentes para nunca perder o
              timing.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
            <span>
              Organograma integrado: responsabilidades e aprovações sem atritos.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
            <span>
              Relatórios prontos para decisões rápidas e melhorias contínuas.
            </span>
          </li>
        </ul>
      </div>

      <div className="text-xs text-gray-400 relative z-10">
        © {new Date().getFullYear()} DTTI-DDS | {APP_NAME}. Todos os direitos
        reservados.
      </div>
    </div>
  );
}
