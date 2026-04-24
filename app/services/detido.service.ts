"use server";

import { apiWithToken } from "@/lib/api";
import { DetidoDTO, CreateDetidoDTO, UpdateDetidoDTO } from "@/lib/dto/detido.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

export async function getDetidos(
  query?: string,
): Promise<DetidoDTO[]> {
  await requiredUser();
  try {
    const token = await getSession();
    const params = query ? `?q=${encodeURIComponent(query)}` : "";
    const response = await apiWithToken(token, {
      next: { tags: ["get-detidos"] },
    }).get(`/detidos${params}`);

    return response.data as DetidoDTO[];
  } catch (error: any) {
    console.error("Error fetching detidos:", error.response?.data);
    throw new Error(
      error.response?.data?.message || "Erro ao carregar detidos",
    );
  }
}

export async function getDetidoById(id: string): Promise<DetidoDTO> {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token).get(`/detidos/${id}`);

    return response.data as DetidoDTO;
  } catch (error: any) {
    console.error("Error fetching detido:", error.response?.data);
    throw new Error(
      error.response?.data?.message || "Erro ao carregar detido",
    );
  }
}

export async function createDetido(data: CreateDetidoDTO): Promise<DetidoDTO> {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/detidos", data);

    return response.data as DetidoDTO;
  } catch (error: any) {
    console.error("Error creating detido:", error.response?.data);
    throw new Error(
      error.response?.data?.message || "Erro ao criar detido",
    );
  }
}

export async function updateDetido(
  id: string,
  data: UpdateDetidoDTO,
): Promise<DetidoDTO> {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token).put(`/detidos/${id}`, data);

    return response.data as DetidoDTO;
  } catch (error: any) {
    console.error("Error updating detido:", error.response?.data);
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar detido",
    );
  }
}

export async function deleteDetido(id: string): Promise<void> {
  await requiredUser();
  try {
    const token = await getSession();
    await apiWithToken(token).delete(`/detidos/${id}`);
  } catch (error: any) {
    console.error("Error deleting detido:", error.response?.data);
    throw new Error(
      error.response?.data?.message || "Erro ao eliminar detido",
    );
  }
}