"use server";

import { apiWithToken } from "@/lib/api";
import {
  AdvogadoData,
  ArguidoData,
  ParticipanteData,
  QueixosoData,
  TestemunhaData,
} from "@/lib/dto/participante.dto";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { requiredUser } from "./user.service";

export async function getParticipantes(numero: string) {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-participantes"] },
    }).get(`/participantes?numero=${numero}`);

    return response.data as ParticipanteData[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "Ocorreu um erro ao buscar os participantes.",
    );
  }
}

export async function createQueixoso(data: QueixosoData) {
  try {
    const token = await getSession();
    await apiWithToken(token).post("/queixosos", data);
    revalidateTag("get-participantes", {});
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error?.response?.data?.message || "Impossível registar o queixoso",
    );
  }
}

export async function createArguido(data: ArguidoData) {
  try {
    const token = await getSession();
    await apiWithToken(token).post("/arguidos", data);
    revalidateTag("get-participantes", {});
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error?.response?.data?.message || "Impossível registar o arguido",
    );
  }
}

export async function createAdvogado(data: AdvogadoData) {
  try {
    const token = await getSession();
    await apiWithToken(token).post("/advogados", data);
    revalidateTag("get-participantes", {});
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error?.response?.data?.message || "Impossível registar o arguido",
    );
  }
}

export async function createTestemunha(data: TestemunhaData) {
  try {
    const token = await getSession();
    await apiWithToken(token).post("/testemunhas", data);
    revalidateTag("get-participantes", {});
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error?.response?.data?.message || "Impossível registar a testemunha",
    );
  }
}
