export type TipoMandado =
  | "MANDADO_DE_DETENCAO"
  | "MANDADO_DE_CUSTODIA"
  | "MANDADO_DE_BUSCA_E_APREENSAO"
  | "MANDADO_DE_SOLTURA"
  | "MANDADO_DE_CAPTURA";

export interface Mandado {
  id: number;
  tipo: TipoMandado;
  numeroProcesso: string;
  nomeRequerente: string;
  nomeExecutado: string;
  dataEmitido: Date | string;
  dataValidade: Date | string;
  emitidoPor: string;
  estado: "PENDENTE" | "EM_EXECUCAO" | "CUMPRIDO" | "CANCELADO";
  observaciones?: string;
}