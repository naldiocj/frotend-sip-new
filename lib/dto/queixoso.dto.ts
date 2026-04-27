import { EstadoCivil } from "./common.dto";

export interface QueixosoListItem {
  id?: number; // Opcional pois o DB gera automaticamente
  nomeCompleto: string;
  nomePai: string;
  nomeMae: string;
  estadoCivil: EstadoCivil; // Enum
  idade: number;
  dataNascimento: string; // LocalDate geralmente trafega como string (ISO 8601)
  naturalidade: string;
  profissao: string;
  numeroBi: string;
  dataEmissaoBi: string;
  email: string;
  telefone: string;
  createdAt?: string;
  updatedAt?: string;
}
