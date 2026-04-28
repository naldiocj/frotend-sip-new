export interface Remessa {
  id?: number;
  codigoRastreio: string;
  origem: string;
  destino: string;
  dataEnvio: Date | string;
  dataRecebimento?: Date | string;
  status: "PENDENTE" | "EM_TRANSITO" | "RECEBIDO";
  documentosIds: number[];
  responsavelEnvio: string;
  arquivo?: string;
}
