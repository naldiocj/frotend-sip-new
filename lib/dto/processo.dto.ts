export interface ProcessoListItem {
  id: number;
  nome: string;
  estadoProcesso: ESTADO_PROCESSO;
  descricao: string;
  direcao: { nome: string };
  numero: string;
  tipoProcesso: "NORMAL" | "AVERIGUACAO" | "COM_DETIDO" | null;
  ano: string;
  crimes: CrimeItem[];
  instrutor: { id: number; nome: string };
  createdAt: string;
  updatedAt: string;
}

export interface ProcessoDocumentoItem {
  id: number;
  titulo: string;
  tipo: string;
  descricao: string;
  processoNumero: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface CrimeItem {
  id: number;
  artigoPenal: string;
  descricao: string;
}

export interface ProcessoItem {
  id: number;
  nome: string;
  estadoProcesso: ESTADO_PROCESSO;
  descricao: string;
  numero: string;
  tipoProcesso: "NORMAL" | "AVERIGUACAO" | "COM_DETIDO" | null;
  ano: string;
  crimes: CrimeItem[];
  createdAt: string;
  updatedAt: string;
}

export const TIPO_PROCESSO = {
  NORMAL: "NORMAL",
  AVERIGUACAO: "AVERIGUACAO",
  COM_DETIDO: "COM_DETIDO",
};

export type ESTADO_PROCESSO =
  | "EM_INSTRUCAO"
  | "ARQUIVADO"
  | "REMETIDO_JUIZO"
  | "REMETIDO_PGR"
  | "TRAMITADO"
  | "SENTENCIADO"
  | null;
