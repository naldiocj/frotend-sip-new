export interface SecretariaDTO {
  id: number;
  nomeCompleto: string;
  codigo: string;
  descricao?: string;
  direcao?: { id: number; nome: string; sigla: string };
  createdAt: string;
  updatedAt: string;
}
