"use server";

import { apiWithToken } from "@/lib/api";
import { DireccaoDTO } from "@/lib/dto/direccao.dto";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { requiredUser } from "./user.service";

interface AtribuirDireccaoDTO {
  processoId: number;
  direccaoId: number;
}

export async function getDireccoes() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-direccoes"] },
    }).get("/direcoes");

    return response.data as DireccaoDTO[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching user session.",
    );
  }
}

export async function atribuirDirecao(data: AtribuirDireccaoDTO) {
  try {
    const token = await getSession();
    await apiWithToken(token).patch(`/processos/${data.processoId}`, {
      direcaoId: data.direccaoId,
    });
    revalidateTag("get-processos", {});
    revalidateTag("get-direccoes", {});
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "Impossivel atribuir a direccao ao processo",
    );
  }
}
