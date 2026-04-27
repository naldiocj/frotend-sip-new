"use server";

import { apiWithToken } from "@/lib/api";
import { CategoriaDTO } from "@/lib/dto/categoria.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

const mockCategorias: CategoriaDTO[] = [
  { id: 1, nome: "Criminal", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
  { id: 2, nome: "Cível", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
  { id: 3, nome: "Laboral", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
  { id: 4, nome: "Família", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
  { id: 5, nome: "Administrativo", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
];

export async function getCategorias() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/categorias");

    return response.data as CategoriaDTO[];
  } catch (error: any) {
    console.warn("Using mock categorias:", error.message);
    return mockCategorias;
  }
}

export async function getCategoriaById(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get(`/categorias/${id}`);

    return response.data as CategoriaDTO;
  } catch (error: any) {
    console.warn("Using mock categoria:", error.message);
    const categoria = mockCategorias.find((c) => c.id === Number(id));
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    return categoria;
  }
}

export interface CreateCategoriaDTO {
  nome: string;
}

export interface UpdateCategoriaDTO {
  nome?: string;
}

export async function createCategoria(data: CreateCategoriaDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/categorias", data);

    return response.data as CategoriaDTO;
  } catch (error: any) {
    console.warn("Using mock create:", error.message);
    const nova: CategoriaDTO = {
      id: mockCategorias.length + 1,
      nome: data.nome,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCategorias.push(nova);
    return nova;
  }
}

export async function updateCategoria(id: string, data: UpdateCategoriaDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).put(`/categorias/${id}`, data);

    return response.data as CategoriaDTO;
  } catch (error: any) {
    console.warn("Using mock update:", error.message);
    const index = mockCategorias.findIndex((c) => c.id === Number(id));
    if (index === -1) {
      throw new Error("Categoria não encontrada");
    }
    mockCategorias[index] = {
      ...mockCategorias[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockCategorias[index];
  }
}

export async function deleteCategoria(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    await apiWithToken(token).delete(`/categorias/${id}`);
  } catch (error: any) {
    console.warn("Using mock delete:", error.message);
    const index = mockCategorias.findIndex((c) => c.id === Number(id));
    if (index !== -1) {
      mockCategorias.splice(index, 1);
    }
  }
}