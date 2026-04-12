"use server";

import { LoginFormDTO, loginFormSchema } from "@/lib/schemas/login.schema";
import { createSession } from "@/lib/session";
import z from "zod";
import { getUserDetail } from "./user.action";

export default async function login(formData: LoginFormDTO) {
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

  const url = new URL(`${process.env.API_URL!}/auth/login`);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedFields.data),
  });

  const result = await response.json();

  if (response.ok) {
    const { token } = result.data;
    await createSession(token);

    const res = await getUserDetail();

    return {
      status: 200,
      message: "Login realizado com sucesso",
      data: res.data,
    };
  }

  return {
    status: 401,
    message: "Credenciais inválidas",
  };
}
