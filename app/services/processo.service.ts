"use server";

import { apiWithToken } from "@/lib/api";
import { ProcessoListItem } from "@/lib/dto/processo.dto";
import { CreateProcessoDTO } from "@/lib/schemas/processo.schema";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { requiredUser } from "./user.service";

export async function getProcessos(query?: string) {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-processos"] },
    }).get(`/processos?term=${query}`);

    return response.data as ProcessoListItem[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "Ocorreu um erro ao buscar os processos.",
    );
  }
}

export async function createProcesso(data: CreateProcessoDTO) {
  try {
    const token = await getSession();
    await apiWithToken(token).post("/processos", data);
    revalidateTag("get-processos", {});
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Impossível criar o processo",
    );
  }
}

export async function getProcessoById(id: string) {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-processos"] },
    }).get(`/processos/${id}`);

    console.log(response.data.crimes);

    return response.data as ProcessoListItem;
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "Ocorreu um erro ao buscar os processos.",
    );
  }
}
