export interface DetidoDTO {
  id: number;
  numeroProcesso: string;
  nomeCompleto: string;
  nomePai: string;
  nomeMae: string;
  dataNascimento: string;
  naturalidade: string;
  profissao: string;
  numeroBi: string;
  dataEmissaoBi: string;
  localEmissaoBi: string;
  telefone: string;
  endereco: string;
  EstadoCivil: string;
  idade: number;
  sexo: "MASCULINO" | "FEMININO";
  estadoDetencao: "DETIDO" | "LIBERTADO" | "TRANSITO";
  dataDetencao: string;
  localDetencao: string;
  motivoDetencao: string;
  observacoes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDetidoDTO {
  nomeCompleto: string;
  nomePai: string;
  nomeMae: string;
  dataNascimento: string;
  naturalidade: string;
  profissao: string;
  numeroBi: string;
  dataEmissaoBi: string;
  localEmissaoBi: string;
  telefone: string;
  endereco: string;
  estadoCivil: string;
  sexo: "MASCULINO" | "FEMININO";
  motivoDetencao: string;
  observacoes?: string;
}

export interface UpdateDetidoDTO extends Partial<CreateDetidoDTO> {
  estadoDetencao?: "DETIDO" | "LIBERTADO" | "TRANSITO";
}