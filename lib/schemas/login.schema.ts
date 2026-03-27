import z from "zod";

export const loginFormSchema = z.object({
  email: z.email({ error: "Por favor, insira um email válido." }).trim(),
  password: z
    .string()
    .min(6, { error: "Deve ter pelo menos 6 caracteres." })
    // .regex(/[a-zA-Z]/, { error: "Deve conter pelo menos uma letra." })
    // .regex(/[0-9]/, { error: "Deve conter pelo menos um número." })
    // .regex(/[^a-zA-Z0-9]/, {
    //   error: "Deve conter pelo menos um caractere especial.",
    // })
    .trim(),
});

export type LoginFormDTO = z.infer<typeof loginFormSchema>;
