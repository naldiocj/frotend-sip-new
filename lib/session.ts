"use server";

import { cookies } from "next/headers";
import { ACCESS_TOKEN, EXPIRE_TIME_ACCESS_TOKEN } from "./constants";

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + EXPIRE_TIME_ACCESS_TOKEN);
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN, token, {
    httpOnly: true,
    secure: true,
    // expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const token = (await cookies()).get(ACCESS_TOKEN)?.value;

  if (!token) {
    return null;
  }

  // const expires = new Date(Date.now() + EXPIRE_TIME_ACCESS_TOKEN);
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN, token, {
    httpOnly: true,
    secure: true,
    // expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN);
}

export async function getSession() {
  try {
    // No Next.js 15/16, cookies() deve ser awaitado
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN);

    return token?.value ?? null;
  } catch (error) {
    // Evita que o servidor retorne um erro 500 bruto
    console.error("Erro ao recuperar sessão:", error);
    return null;
  }
}
