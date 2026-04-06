export interface ParticipanteData {
  id: string;
  tipoParticipante: string;
  queixoso: {
    nomeCompleto: string;
    telefone: string;
  };
  arguido: {
    nomeCompleto: string;
    telefone: string;
  };
  testemunha: {
    nomeCompleto: string;
    telefone: string;
  };
  advogado: {
    nomeCompleto: string;
    telefone: string;
  };
}

export type QueixosoData = {
  nomeCompleto: string;
  nomePai: string;
  nomeMae: string;
  estadoCivil: string;
  idade: number;
  dataNascimento: string;
  naturalidade: string;
  profissao: string;
  numeroBi: string;
  dataEmissaoBi: string;
  email: string;
  telefone: string;
  endereco: string;
  processoNumero: string;
};

export type ArguidoData = {
  nomeCompleto: string;
  nomePai: string;
  nomeMae: string;
  estadoCivil: string;
  idade: number;
  dataNascimento: string;
  naturalidade: string;
  profissao: string;
  numeroBi: string;
  dataEmissaoBi: string;
  email: string;
  telefone: string;
  endereco: string;
  processoNumero: string;
};

export type AdvogadoData = {
  nomeCompleto: string;
  numeroCedula: string;
  telefone: string;
  tipoAdvogado: "DEFESA" | "ACUSACAO";
  processoNumero: string;
};
