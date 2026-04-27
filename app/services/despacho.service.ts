"use server";

import { apiWithToken } from "@/lib/api";
import { Despacho } from "@/lib/dto/despacho.dto";
import { CreateDespachoData } from "@/lib/schemas/despacho.schema";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { requiredUser } from "./user.service";

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
    throw new Error(
      error.response?.data?.message ||
        "Ocorreu um erro ao buscar os despachos.",
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
