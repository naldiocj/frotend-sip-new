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
        pathname: "AUTO_DECLARACAO",
      },
      {
        icon: FileText,
        label: "Auto de Declaração em Aditamento",
        pathname: "AUTO_DECLARACAO_EM_ADITAMENTO",
      },
      {
        icon: FileWarning,
        label: "Auto de Denúncia",
        pathname: "AUTO_DE_DENUNCIA",
      },
      {
        icon: Briefcase,
        label: "Auto de Diligência",
        pathname: "AUTO_DILIGENCIA",
      },
      {
        icon: User,
        label: "Auto de Constituição de Arguido",
        pathname: "AUTO_CONSTITUICAO_DE_ARGUIDO",
      },
      {
        icon: FileQuestion,
        label: "Auto de Interrogatório",
        pathname: "AUTO_INTERROGATORIO",
      },
      {
        icon: Search,
        label: "Auto de Reconhecimento físico e directo de Objectos",
        pathname: "AUTO_RECONHECIMENTO_FISICO_E_DIRECTO_DE_OBJS",
      },
      {
        icon: Search,
        label: "Auto de Reconhecimento físico e directo de Pessoas",
        pathname: "AUTO_RECONHECIMENTO_FISICO_E_DIRECTO_DE_PESSOAS",
      },
      {
        icon: Gavel,
        label: "Auto de Busca e Apreensão",
        pathname: "AUTO_BUSCA_E_APREENSAO",
      },
      {
        icon: FileSignature,
        label: "Auto de Depoimento Directo",
        pathname: "AUTO_DEPOIMENTO_DIRECTO",
      },
      {
        icon: FileSignature,
        label: "Auto de Depoimento Indirecto",
        pathname: "AUTO_DEPOIMENTO_INDIRECTO",
      },
      {
        icon: FileSearch,
        label: "Auto de Exame Directo",
        pathname: "AUTO_EXAME_DIRECTO",
      },
      {
        icon: FileSearch,
        label: "Auto de Exame Directo e Avaliação",
        pathname: "AUTO_EXAME_DIRECTO_E_AVALIACAO",
      },
      {
        icon: History,
        label: "Auto de Reconstituição",
        pathname: "AUTO_RECONSTITUICAO",
      },
      {
        icon: FileWarning,
        label: "Auto de Corpo de Delito Directo",
        pathname: "AUTO_CORPO_DE_DELITO_DIRECTO",
      },
      {
        icon: FileWarning,
        label: "Auto de Corpo de Delito Indireto",
        pathname: "AUTO_CORPO_DE_DELITO_INDIRETO",
      },
      {
        icon: Stamp,
        label: "Auto de Restituição",
        pathname: "AUTO_RESTITUICAO",
      },
      {
        icon: Users,
        label: "Auto de Acarcação",
        pathname: "AUTO_ACARCACAO",
      },
    ],
  },
  {
    title: "Mandados",
    items: [
      {
        icon: Gavel,
        label: "Mandado de Detenção",
        pathname: "MANDADO_DE_DETENCAO",
      },
      {
        icon: Shield,
        label: "Mandado de Custódia",
        pathname: "MANDADO_DE_CUSTODIA",
      },
      {
        icon: Search,
        label: "Mandado de Busca e Apreensão",
        pathname: "MANDADO_DE_BUSCA_E_APREENSAO",
      },
      {
        icon: FileCheck,
        label: "Mandado de Soltura",
        pathname: "MANDADO_DE_SOLTURA",
      },
      {
        icon: Siren,
        label: "Mandado de Captura",
        pathname: "MANDADO_DE_CAPTURA",
      },
    ],
  },
  {
    title: "Termos",
    items: [
      {
        icon: FileSignature,
        label: "Termo de Identidade e Residência",
        pathname: "TERMO_DE_IDENTIDADE_E_RESIDENCIA",
      },
      { icon: Stamp, label: "Termo de Entrega", pathname: "TERMO_DE_ENTREGA" },
      { icon: Send, label: "Termo de Remessa", pathname: "TERMO_DE_REMESSA" },
      {
        icon: Lock,
        label: "Termo de Confidencialidade",
        pathname: "TERMO_DE_CONFIDENCIALIDADE",
      },
      {
        icon: FileCheck,
        label: "Termo de Recebimento",
        pathname: "TERMO_DE_RECEBIMENTO",
      },
    ],
  },
  {
    title: "Cota",
    items: [{ icon: ScrollText, label: "Cota", pathname: "COTA" }],
  },
  {
    title: "Requisições",
    items: [
      { icon: FileSearch, label: "Perícia / Exame", pathname: "PERICIA_EXAME" },
      {
        icon: FileText,
        label: "Informação Criminal",
        pathname: "INFORMACAO_CRIMINAL",
      },
    ],
  },
  {
    title: "Ofícios",
    items: [
      {
        icon: FolderOpen,
        label: "Ofício de Remessa",
        pathname: "OFICIO_DE_REMESSA",
      },
    ],
  },
];
