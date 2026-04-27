export interface AdvogadoListItem {
  id?: number; // Opcional pois o DB gera automaticamente
  nomeCompleto: string;
  numeroCedula: string;
  tipoAdvogado: TipoAdvogado;
  telefone: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum TipoAdvogado {
  DEFESA = "DEFESA",
  ACUSACAO = "ACUSACAO",
}
