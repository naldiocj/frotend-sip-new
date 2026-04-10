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
        url: "/autos-declaracoes",
      },
      { icon: FileText, label: "Auto de Declaração em Aditamento", url: "" },
      { icon: FileWarning, label: "Auto de Denúncia", url: "" },
      { icon: Briefcase, label: "Auto de Diligência", url: "" },
      { icon: User, label: "Auto de Constituição de Arguido", url: "" },
      { icon: FileQuestion, label: "Auto de Interrogatório", url: "" },
      {
        icon: Search,
        label: "Auto de Reconhecimento físico e directo de Objectos",
        url: "",
      },
      {
        icon: Search,
        label: "Auto de Reconhecimento físico e directo de Pessoas",
        url: "",
      },
      { icon: Gavel, label: "Auto de Busca e Apreensão", url: "" },
      { icon: FileSignature, label: "Auto de Depoimento Directo", url: "" },
      { icon: FileSignature, label: "Auto de Depoimento Indirecto", url: "" },
      { icon: FileSearch, label: "Auto de Exame Directo", url: "" },
      {
        icon: FileSearch,
        label: "Auto de Exame Directo e Avaliação",
        url: "",
      },
      { icon: History, label: "Auto de Reconstituição", url: "" },
      {
        icon: FileWarning,
        label: "Auto de Corpo de Delito Directo",
        url: "",
      },
      {
        icon: FileWarning,
        label: "Auto de Corpo de Delito Indireto",
        url: "",
      },
      { icon: Stamp, label: "Auto de Restituição", url: "" },
      { icon: Users, label: "Auto de Acarcação", url: "" },
    ],
  },
  {
    title: "Mandados",
    items: [
      { icon: Gavel, label: "Mandado de Detenção", url: "" },
      { icon: Shield, label: "Mandado de Custódia", url: "" },
      { icon: Search, label: "Mandado de Busca e Apreensão", url: "" },
      { icon: FileCheck, label: "Mandado de Soltura", url: "" },
      { icon: Siren, label: "Mandado de Captura", url: "" },
    ],
  },
  {
    title: "Termos",
    items: [
      {
        icon: FileSignature,
        label: "Termo de Identidade e Residência",
        url: "",
      },
      { icon: Stamp, label: "Termo de Entrega", url: "" },
      { icon: Send, label: "Termo de Remessa", url: "" },
      { icon: Lock, label: "Termo de Confidencialidade", url: "" },
      { icon: FileCheck, label: "Termo de Recebimento", url: "" },
    ],
  },
  {
    title: "Cota",
    items: [{ icon: ScrollText, label: "Cota", url: "" }],
  },
  {
    title: "Requisições",
    items: [
      { icon: FileSearch, label: "Perícia / Exame", url: "" },
      { icon: FileText, label: "Informação Criminal", url: "" },
    ],
  },
  {
    title: "Ofícios",
    items: [{ icon: FolderOpen, label: "Ofício de Remessa", url: "" }],
  },
];
