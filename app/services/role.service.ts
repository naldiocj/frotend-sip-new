"use server";

import { apiWithToken } from "@/lib/api";
import { RoleDTO } from "@/lib/dto/user.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

export async function getRoles(): Promise<RoleDTO[]> {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/roles");
    return response.data as RoleDTO[];
  } catch (error: any) {
    console.warn("Using mock roles (API unavailable):", error.message);
    return [
      { id: 1, name: "ADMIN", description: "Administrador do sistema" },
      { id: 2, name: "DIRECTOR", description: "Director" },
      { id: 3, name: "INSTRUTOR", description: "Instrutor" },
      { id: 4, name: "SECRETARIA", description: "Secretaria" },
      { id: 5, name: "SECRETARIA_GERAL", description: "Secretaria Geral" },
      { id: 6, name: "PGR", description: "Procurador" },
      { id: 7, name: "PIQUETE", description: "Piquete" },
    ];
  }
}
