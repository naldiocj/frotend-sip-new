import z from "zod";

export const createDespachoSchema = z.object({
  numeroProcesso: z.string().min(1, "O número do processo é obrigatório"),
  decisao: z.string().min(1, "A decisão é obrigatória"),
  dataDespacho: z.string().min(1, "A data do despacho é obrigatória"),
  autoridadeResponsavel: z
    .string()
    .min(1, "A autoridade responsável é obrigatória"),
  observacoes: z.string().optional(),
  isFinalizado: z.boolean(),
});

export type CreateDespachoData = z.infer<typeof createDespachoSchema>;

