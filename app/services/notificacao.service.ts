"use server";

import { Notificacao } from "@/lib/dto/notificacao.dto";
import { requiredUser } from "./user.service";

const mockNotificacoes: Notificacao[] = [
  {
    id: 1,
    titulo: "Novo processo atribuído",
    mensagem: "Foi-lhe atribuído o processo n.º 2024/IPJ/015 para instrução.",
    tipo: "INFO",
    lida: false,
    data: "2024-03-28T10:00:00Z",
    link: "/admin/instrutor/processos/15",
  },
  {
    id: 2,
    titulo: "Prazo para diligência",
    mensagem: "O prazo para realizar a diligência no processo 2024/IPJ/008 termina amanhã.",
    tipo: "URGENTE",
    lida: false,
    data: "2024-03-27T14:30:00Z",
    link: "/admin/instrutor/processos/8",
  },
  {
    id: 3,
    titulo: "Processo arquivado",
    mensagem: "O processo n.º 2024/IPJ/003 foi arquivado por falta de provas.",
    tipo: "SUCESSO",
    lida: true,
    data: "2024-03-26T09:00:00Z",
    link: "/admin/instrutor/processos/3",
  },
  {
    id: 4,
    titulo: "Documento recebido",
    mensagem: "Novo documentorecebido do Ministério Público relativo ao processo 2024/IPJ/012.",
    tipo: "INFO",
    lida: false,
    data: "2024-03-25T16:00:00Z",
    link: "/admin/instrutor/processos/12",
  },
  {
    id: 5,
    titulo: "Audiência marcada",
    mensagem: "Audiência marcada para o dia 15/04/2024 às 09:00 no processo 2024/IPJ/020.",
    tipo: "AVISO",
    lida: true,
    data: "2024-03-24T11:00:00Z",
    link: "/admin/instrutor/processos/20",
  },
  {
    id: 6,
    titulo: "Lembrete: Despacho pendente",
    mensagem: "Tem despacho pendente de parecer no processo 2024/IPJ/018.",
    tipo: "AVISO",
    lida: true,
    data: "2024-03-23T08:00:00Z",
    link: "/admin/instrutor/processos/18",
  },
  {
    id: 7,
    titulo: "Nova participação",
    mensagem: " foi registada nova participação ciudadana no sistema.",
    tipo: "INFO",
    lida: false,
    data: "2024-03-22T13:00:00Z",
  },
  {
    id: 8,
    titulo: "Transferência de processo",
    mensagem: "O processo 2024/IPJ/025 foi transferido para otro instrutor.",
    tipo: "AVISO",
    lida: true,
    data: "2024-03-21T10:00:00Z",
  },
];

export async function getNotificacoes(query?: string, lida?: string) {
  await requiredUser();
  let filtered = [...mockNotificacoes];
  
  const term = query?.toLowerCase() || "";
  if (term) {
    filtered = filtered.filter(
      (n) =>
        n.titulo.toLowerCase().includes(term) ||
        n.mensagem.toLowerCase().includes(term),
    );
  }
  
  if (lida === "true") {
    filtered = filtered.filter((n) => n.lida);
  } else if (lida === "false") {
    filtered = filtered.filter((n) => !n.lida);
  }
  
  return filtered.sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
  );
}