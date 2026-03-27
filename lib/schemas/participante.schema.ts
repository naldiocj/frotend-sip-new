import z from "zod";

export const createParticipanteSchema = z.object({
  id: z.number().optional(),
  tipoParticipante: z.string(),
  queixoso: z.object({
    nomeCompleto: z.string(),
    telefone: z.string(),
  }),
  arguido: z.object({
    nomeCompleto: z.string(),
    telefone: z.string(),
  }),
  testemunha: z.object({
    nomeCompleto: z.string(),
    telefone: z.string(),
  }),
  advogado: z.object({
    nomeCompleto: z.string(),
    telefone: z.string(),
  }),
});

export const createQueixosoSchema = z.object({
  nomeCompleto: z.string().min(1, "O nome completo é obrigatório"),
  nomePai: z.string().min(1, "A nome do pai é obrigatório"),
  nomeMae: z.string().min(1, "O título é obrigatório"),
  estadoCivil: z.string().min(1, "A estado civil é obrigatório"),
  idade: z.number().min(1, "O idade é obrigatório"),
  dataNascimento: z.string().min(1, "A data nascimento é obrigatório"),
  naturalidade: z.string().min(1, "O naturalidade é obrigatório"),
  profissao: z.string().min(1, "O profissão é obrigatório"),
  numeroBi: z.string().min(1, "O nº BI é obrigatório"),
  dataEmissaoBi: z.string().min(1, "O data de emissão do BI é obrigatório"),
  email: z.string().min(1, "O email é obrigatório"),
  telefone: z.string().min(1, "O telefone é obrigatório"),
  endereco: z.string().min(1, "O endereço é obrigatório"),
  processoId: z.number(),
});
