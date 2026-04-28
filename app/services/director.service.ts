"use server";

import { apiWithToken } from "@/lib/api";
import { DirectorDTO } from "@/lib/dto/director.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

const mockDirectores: DirectorDTO[] = [
  {
    id: 1,
    nomeCompleto: "João Manuel dos Santos",
    patenteId: 1,
    cargoId: 1,
    direcaoId: 1,
    userId: 1,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    nomeCompleto: "Maria Fernanda Kalaluena",
    patenteId: 2,
    cargoId: 2,
    direcaoId: 2,
    userId: 2,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 3,
    nomeCompleto: "Carlos Alberto Chipenda",
    patenteId: 3,
    cargoId: 3,
    direcaoId: 1,
    userId: 3,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
];

export async function getDirectores() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/directores");
    return response.data as DirectorDTO[];
  } catch (error: any) {
    console.warn("Using mock directores:", error.message);
    return mockDirectores;
  }
}

export async function getDirectorById(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get(`/directores/${id}`);
    return response.data as DirectorDTO;
  } catch (error: any) {
    console.warn("Using mock director:", error.message);
    const director = mockDirectores.find((d) => d.id === Number(id));
    if (!director) {
      throw new Error("Director não encontrado");
    }
    return director;
  }
}

export async function createDirector(data: DirectorDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/directores", data);
    return response.data as DirectorDTO;
  } catch (error: any) {
    console.warn("Using mock create:", error.message);
    const novo: DirectorDTO = {
      id: mockDirectores.length + 1,
      nomeCompleto: data.nomeCompleto,
      patenteId: data.patenteId,
      cargoId: data.cargoId,
      direcaoId: data.direcaoId,
      userId: data.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockDirectores.push(novo);
    return novo;
  }
}

export async function updateDirector(id: string, data: Partial<DirectorDTO>) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).put(`/directores/${id}`, data);
    return response.data as DirectorDTO;
  } catch (error: any) {
    console.warn("Using mock update:", error.message);
    const index = mockDirectores.findIndex((d) => d.id === Number(id));
    if (index === -1) {
      throw new Error("Director não encontrado");
    }
    mockDirectores[index] = {
      ...mockDirectores[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockDirectores[index];
  }
}

export async function deleteDirector(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    await apiWithToken(token).delete(`/directores/${id}`);
  } catch (error: any) {
    console.warn("Using mock delete:", error.message);
    const index = mockDirectores.findIndex((d) => d.id === Number(id));
    if (index !== -1) {
      mockDirectores.splice(index, 1);
    }
  }
}

export async function bulkCreateDirector(data: DirectorDTO[]) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/directores/bulk", data);
    return response.data as DirectorDTO[];
  } catch (error: any) {
    console.warn("Using mock bulk create:", error.message);
    const novos: DirectorDTO[] = data.map((item, index) => ({
      id: mockDirectores.length + index + 1,
      nomeCompleto: item.nomeCompleto,
      patenteId: item.patenteId,
      cargoId: item.cargoId,
      direcaoId: item.direcaoId,
      userId: item.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    mockDirectores.push(...novos);
    return novos;
  }
}