import z from "zod";

export const createProcessoSchema = z.object({
  nome: z.string().optional(),
  descricao: z.string().min(1, "A descrição é obrigatório"),
  numero: z.string().min(1, "O nº do processo é obrigatório"),
  tipoProcesso: z
    .enum(["NORMAL", "AVERIGUACAO", "COM_DETIDO"])
    .default("NORMAL"),
  estadoProcesso: z
    .enum([
      "EM_INSTRUCAO",
      "ARQUIVADO",
      "REMETIDO_JUIZO",
      "REMETIDO_PGR",
      "TRAMITADO",
      "SENTENCIADO",
    ])
    .default("EM_INSTRUCAO"),
  ano: z.coerce
    .number({ error: "O ano é obrigatório" })
    .min(0, "O ano  é obrigatório"),

  crimesIds: z.array(z.any()).min(1, "O crime é obrigatório"),
});

export type CreateProcessoDTO = z.infer<typeof createProcessoSchema>;
