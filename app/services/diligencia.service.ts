"use server";

import { apiWithToken } from "@/lib/api";
import { DiligenciaItem } from "@/lib/dto/diligencias.dto";
import { CreateDiligenciaData } from "@/lib/schemas/diligencia.schema";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { requiredUser } from "./user.service";

export async function getDiligencias(id: string) {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-diligencias"] },
    }).get(`/diligencias?numero=${id}`);

    console.log(response.data.crimes);

    return response.data as DiligenciaItem[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "Ocorreu um erro ao buscar os processos.",
    );
  }
}

export async function createDiligencia(data: CreateDiligenciaData) {
  try {
    const token = await getSession();
    await apiWithToken(token).post("/diligencias", data);
    revalidateTag("get-diligencias", {});
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Impossível registar a diligência",
    );
  }
}
