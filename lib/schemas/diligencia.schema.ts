import z from "zod";

export const createDiligenciaSchema = z.object({
  ordem: z.number().optional(),
  etapa: z.string().min(1, "A etapa é obrigatório"),
  titulo: z.string().min(1, "O título é obrigatório"),
  descricao: z.string().min(1, "A descrição é obrigatório"),
  prazo: z.string().min(1, "O prazo é obrigatório"),
  processoNumero: z.string(),
  estado: z.enum(["PENDENTE", "CONCLUIDA"]),
});

export type CreateDiligenciaData = z.infer<typeof createDiligenciaSchema>;
