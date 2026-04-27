"use server";

import { apiWithToken } from "@/lib/api";
import { Despacho } from "@/lib/dto/despacho.dto";
import { CreateDespachoData } from "@/lib/schemas/despacho.schema";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { requiredUser } from "./user.service";

const mockDespachos: Despacho[] = [
  {
    id: 1,
    numeroProcesso: "2024/IPJ/0001",
    decisao: "Determino o arquivamento do processo por falta de provas.",
    autoridadeResponsavel: "Dr. João Manuel",
    dataDespacho: "2024-03-15T10:00:00Z",
    isFinalizado: true,
    processoId: 1,
  },
  {
    id: 2,
    numeroProcesso: "2024/IPJ/0002",
    decisao: "Mando proceder a instrução contraditória.",
    autoridadeResponsavel: "Dra. Maria Silva",
    dataDespacho: "2024-03-18T14:30:00Z",
    isFinalizado: false,
    processoId: 2,
  },
  {
    id: 3,
    numeroProcesso: "2024/IPJ/0003",
    decisao: "Determino a transferência para o tribunal.",
    autoridadeResponsavel: "Dr. João Manuel",
    dataDespacho: "2024-03-20T09:00:00Z",
    isFinalizado: true,
    processoId: 3,
  },
  {
    id: 4,
    numeroProcesso: "2024/IPJ/0004",
    decisao: "Convoco as partes para audiência.",
    autoridadeResponsavel: "Dra. Ana Costa",
    dataDespacho: "2024-03-22T11:00:00Z",
    isFinalizado: false,
    processoId: 4,
  },
  {
    id: 5,
    numeroProcesso: "2024/IPJ/0005",
    decisao: "inckuo junvico de diligncias.",
    autoridadeResponsavel: "Dr. Pedro Santos",
    dataDespacho: "2024-03-25T16:00:00Z",
    isFinalizado: false,
    processoId: 5,
  },
];

export async function getDespachos(query?: string) {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-despachos"] },
    }).get(`/despachos`);

    console.table(response);

    return response as Despacho[];
  } catch (error: any) {
    console.log(error.response?.data);
    const term = query?.toLowerCase() || "";
    return mockDespachos.filter(
      (d) =>
        !term ||
        d.numeroProcesso.toLowerCase().includes(term) ||
        d.decisao.toLowerCase().includes(term) ||
        d.autoridadeResponsavel.toLowerCase().includes(term),
    );
  }
}

export async function createDespacho(data: CreateDespachoData) {
  try {
    const token = await getSession();
    await apiWithToken(token).post("/despachos", data);
    revalidateTag("get-despachos", {});
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error?.response?.data?.message || "Impossível registar o despacho",
    );
  }
}
