import {
  Briefcase,
  FileCheck,
  FileQuestion,
  FileSearch,
  FileSignature,
  FileText,
  FileWarning,
  FolderOpen,
  Gavel,
  History,
  Lock,
  ScrollText,
  Search,
  Send,
  Shield,
  Siren,
  Stamp,
  User,
  Users,
} from "lucide-react";
import { PecaCategory } from "./types";

export const DOCUMENT_CATEGORIES: PecaCategory[] = [
  {
    title: "Autos",
    items: [
      {
        icon: FileText,
        label: "Auto de Declaração",
        pathname: "auto-de-declaracao",
      },
      {
        icon: FileText,
        label: "Auto de Declaração em Aditamento",
        pathname: "auto-de-declaracao-em-aditamento",
      },
      {
        icon: FileWarning,
        label: "Auto de Denúncia",
        pathname: "auto-de-denuncia",
      },
      {
        icon: Briefcase,
        label: "Auto de Diligência",
        pathname: "auto-de-diligencia",
      },
      {
        icon: User,
        label: "Auto de Constituição de Arguido",
        pathname: "auto-de-constituicao-de-arguido",
      },
      {
        icon: FileQuestion,
        label: "Auto de Interrogatório",
        pathname: "auto-de-interrogatorio",
      },
      {
        icon: Search,
        label: "Auto de Reconhecimento físico e directo de Objectos",
        pathname: "auto-de-reconhecimento-fisico-e-directo-de-objectos",
      },
      {
        icon: Search,
        label: "Auto de Reconhecimento físico e directo de Pessoas",
        pathname: "auto-de-reconhecimento-fisico-e-directo-de-pessoas",
      },
      {
        icon: Gavel,
        label: "Auto de Busca e Apreensão",
        pathname: "auto-de-busca-e-apreensao",
      },
      {
        icon: FileSignature,
        label: "Auto de Depoimento Directo",
        pathname: "auto-de-depoimento-directo",
      },
      {
        icon: FileSignature,
        label: "Auto de Depoimento Indirecto",
        pathname: "auto-de-depoimento-indirecto",
      },
      {
        icon: FileSearch,
        label: "Auto de Exame Directo",
        pathname: "auto-de-exame-directo",
      },
      {
        icon: FileSearch,
        label: "Auto de Exame Directo e Avaliação",
        pathname: "auto-de-exame-directo-e-avaliacao",
      },
      {
        icon: History,
        label: "Auto de Reconstituição",
        pathname: "auto-de-reconstituicao",
      },
      {
        icon: FileWarning,
        label: "Auto de Corpo de Delito Directo",
        pathname: "auto-de-corpo-de-delito-directo",
      },
      {
        icon: FileWarning,
        label: "Auto de Corpo de Delito Indireto",
        pathname: "auto-de-corpo-de-delito-indireto",
      },
      {
        icon: Stamp,
        label: "Auto de Restituição",
        pathname: "auto-de-restituicao",
      },
      {
        icon: Users,
        label: "Auto de Acarcação",
        pathname: "auto-de-acarcacao",
      },
    ],
  },
  {
    title: "Mandados",
    items: [
      {
        icon: Gavel,
        label: "Mandado de Detenção",
        pathname: "mandado-de-detencao",
      },
      {
        icon: Shield,
        label: "Mandado de Custódia",
        pathname: "mandado-de-custodia",
      },
      {
        icon: Search,
        label: "Mandado de Busca e Apreensão",
        pathname: "mandado-de-busca-e-apreensao",
      },
      {
        icon: FileCheck,
        label: "Mandado de Soltura",
        pathname: "mandado-de-soltura",
      },
      {
        icon: Siren,
        label: "Mandado de Captura",
        pathname: "mandado-de-captura",
      },
    ],
  },
  {
    title: "Termos",
    items: [
      {
        icon: FileSignature,
        label: "Termo de Identidade e Residência",
        pathname: "termo-de-identidade-e-residencia",
      },
      { icon: Stamp, label: "Termo de Entrega", pathname: "termo-de-entrega" },
      { icon: Send, label: "Termo de Remessa", pathname: "termo-de-remessa" },
      {
        icon: Lock,
        label: "Termo de Confidencialidade",
        pathname: "termo-de-confidencialidade",
      },
      {
        icon: FileCheck,
        label: "Termo de Recebimento",
        pathname: "termo-de-recebimento",
      },
    ],
  },
  {
    title: "Cota",
    items: [{ icon: ScrollText, label: "Cota", pathname: "cota" }],
  },
  {
    title: "Requisições",
    items: [
      { icon: FileSearch, label: "Perícia / Exame", pathname: "pericia-exame" },
      {
        icon: FileText,
        label: "Informação Criminal",
        pathname: "informacao-criminal",
      },
    ],
  },
  {
    title: "Ofícios",
    items: [
      {
        icon: FolderOpen,
        label: "Ofício de Remessa",
        pathname: "oficio-de-remessa",
      },
    ],
  },
];
