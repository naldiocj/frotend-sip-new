"use server";

import { apiWithToken } from "@/lib/api";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";
import { PatenteDTO } from "@/lib/dto/patente.dto";

const mockPatentes: PatenteDTO[] = [
  { id: 1, nome: "Comissário", categoria: { nome: "Polícia" }, createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
  { id: 2, nome: "Inspector", categoria: { nome: "Polícia" }, createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
  { id: 3, nome: "Sub-Inspector", categoria: { nome: "Polícia" }, createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
  { id: 4, nome: "Comandante", categoria: { nome: "Comando" }, createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
  { id: 5, nome: "Deputy Commander", categoria: { nome: "Comando" }, createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
];

export async function getPatentes() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/patentes");

    return response.data as PatenteDTO[];
  } catch (error: any) {
    console.warn("Using mock patentes:", error.message);
    return mockPatentes;
  }
}

export async function getPatenteById(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get(`/patentes/${id}`);

    return response.data as PatenteDTO;
  } catch (error: any) {
    console.warn("Using mock patente:", error.message);
    const patente = mockPatentes.find((p) => p.id === Number(id));
    if (!patente) {
      throw new Error("Patente não encontrada");
    }
    return patente;
  }
}

export interface CreatePatenteDTO {
  nome: string;
  categoriaId?: number;
}

export interface UpdatePatenteDTO {
  nome?: string;
  categoriaId?: number;
}

export async function createPatente(data: CreatePatenteDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/patentes", data);

    return response.data as PatenteDTO;
  } catch (error: any) {
    console.warn("Using mock create:", error.message);
    const nova: PatenteDTO = {
      id: mockPatentes.length + 1,
      nome: data.nome,
      categoria: { nome: "Polícia" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockPatentes.push(nova);
    return nova;
  }
}

export async function updatePatente(id: string, data: UpdatePatenteDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).put(`/patentes/${id}`, data);

    return response.data as PatenteDTO;
  } catch (error: any) {
    console.warn("Using mock update:", error.message);
    const index = mockPatentes.findIndex((p) => p.id === Number(id));
    if (index === -1) {
      throw new Error("Patente não encontrada");
    }
    mockPatentes[index] = {
      ...mockPatentes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockPatentes[index];
  }
}

export async function deletePatente(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    await apiWithToken(token).delete(`/patentes/${id}`);
  } catch (error: any) {
    console.warn("Using mock delete:", error.message);
    const index = mockPatentes.findIndex((p) => p.id === Number(id));
    if (index !== -1) {
      mockPatentes.splice(index, 1);
    }
  }
}