import { EstadoCivil } from "./common.dto";

export interface TestemunhaListItem {
  id?: number;
  nomeCompleto: string;
  nomePai: string;
  nomeMae: string;
  estadoCivil: EstadoCivil;
  idade: number;
  dataNascimento: string;
  naturalidade: string;
  profissao: string;
  numeroBi: string;
  dataEmissaoBi: string;
  email: string;
  telefone: string;
  createdAt?: string;
  updatedAt?: string;
}

