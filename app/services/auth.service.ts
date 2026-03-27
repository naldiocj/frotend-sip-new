"use server";

import { api } from "@/lib/api";
import { LoginResponseStatusDTO } from "@/lib/dto/login.dto";
import { LoginFormDTO, loginFormSchema } from "@/lib/schemas/login.schema";
import { createSession } from "@/lib/session";
import { isAxiosError } from "axios";
import z from "zod";

export async function login(
  formData: LoginFormDTO,
): Promise<LoginResponseStatusDTO> {
  const validatedFields = loginFormSchema.safeParse({
    email: formData.email,
    password: formData.password,
  });

  if (!validatedFields.success) {
    return {
      status: 400,
      message: "Dados inválidos",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  try {
    const response = await api.post("auth/login", validatedFields.data);
    const { token: newToken } = response.data;
    await createSession(newToken);

    return {
      status: 200,
      message: "Login realizado com sucesso",
    };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        return {
          status: 401,
          message: "Credenciais inválidas",
        };
      }
    }

    return {
      status: 500,
      message: "Erro interno. Tente novamente.",
    };
  }
}
