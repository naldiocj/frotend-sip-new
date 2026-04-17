export interface InstrutorDetailDTO {
  id: number;
  nomeCompleto: string;
  patente: string;
  cargoId: string;
  direcao: { id: number; nome: string };
  createdAt: string;
  updatedAt: string;
}
