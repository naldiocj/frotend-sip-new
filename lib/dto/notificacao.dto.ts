export interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  tipo: "INFO" | "AVISO" | "URGENTE" | "SUCESSO";
  lida: boolean;
  data: Date | string;
  link?: string;
}