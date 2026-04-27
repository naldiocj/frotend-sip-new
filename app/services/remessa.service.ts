"use server";

import { apiWithToken } from "@/lib/api";
import { Remessa } from "@/lib/dto/remessa.dto";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { requiredUser } from "./user.service";

const mockRemessas: Remessa[] = [
  {
    id: 1,
    codigoRastreio: "RM2024/001",
    origem: "Tribunal de Luanda",
    destino: "Direção Provincial",
    dataEnvio: "2024-03-15T10:00:00Z",
    dataRecebimento: "2024-03-16T14:00:00Z",
    status: "RECEBIDO",
    documentosIds: [1, 2],
    responsavelEnvio: "Dr. João Manuel",
  },
  {
    id: 2,
    codigoRastreio: "RM2024/002",
    origem: "Comando Provincial",
    destino: "IPJ",
    dataEnvio: "2024-03-18T09:00:00Z",
    status: "EM_TRANSITO",
    documentosIds: [3],
    responsavelEnvio: "Dr. Maria Silva",
  },
  {
    id: 3,
    codigoRastreio: "RM2024/003",
    origem: "Direção Nacional",
    destino: "Tribunal Provincial",
    dataEnvio: "2024-03-20T11:00:00Z",
    status: "PENDENTE",
    documentosIds: [4, 5],
    responsavelEnvio: "Dr. Pedro Santos",
  },
  {
    id: 4,
    codigoRastreio: "RM2024/004",
    origem: "IPJ",
    destino: "Ministério Público",
    dataEnvio: "2024-03-22T15:00:00Z",
    status: "EM_TRANSITO",
    documentosIds: [6],
    responsavelEnvio: "Dra. Ana Costa",
  },
  {
    id: 5,
    codigoRastreio: "RM2024/005",
    origem: "Tribunal de Benguela",
    destino: "Direção Provincial",
    dataEnvio: "2024-03-25T10:00:00Z",
    dataRecebimento: "2024-03-26T09:00:00Z",
    status: "RECEBIDO",
    documentosIds: [7, 8],
    responsavelEnvio: "Dr. João Manuel",
  },
];

export async function getRemessas(query?: string) {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-remessas"] },
    }).get(`/remessas`);

    return response as Remessa[];
  } catch (error: any) {
    const term = query?.toLowerCase() || "";
    return mockRemessas.filter(
      (r) =>
        !term ||
        r.codigoRastreio.toLowerCase().includes(term) ||
        r.origem.toLowerCase().includes(term) ||
        r.destino.toLowerCase().includes(term) ||
        r.responsavelEnvio.toLowerCase().includes(term),
    );
  }
}