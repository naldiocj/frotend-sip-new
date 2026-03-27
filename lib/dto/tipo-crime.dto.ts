export interface TipoCrimeDTO {
  id: number;
  artigoPenal?: string;
  descricao: string;
  usuarioId?: number;
  createdAt: Date;
  updatedAt: Date;
}
