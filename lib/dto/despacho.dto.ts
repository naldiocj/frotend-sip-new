export interface Despacho {
  id?: number;
  numeroProcesso: string;
  decisao: string;
  dataDespacho: Date | string;
  autoridadeResponsavel: string;
  observacoes?: string;
  processoId: number;
  isFinalizado: boolean;
  createdAt?: Date;
}
