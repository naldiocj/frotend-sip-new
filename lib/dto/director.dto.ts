export interface DirectorDTO {
  id: number;
  nomeCompleto: string;
  patenteId?: number;
  cargoId?: number;
  direcaoId?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDirectorDTO {
  nomeCompleto: string;
  patenteId?: number;
  cargoId?: number;
  direcaoId?: number;
  userId?: number;
}

export interface UpdateDirectorDTO {
  nomeCompleto?: string;
  patenteId?: number;
  cargoId?: number;
  direcaoId?: number;
}