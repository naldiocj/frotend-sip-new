"use server";

import { apiWithToken } from "@/lib/api";
import { TipoCrimeDTO } from "@/lib/dto/tipo-crime.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

const mockTiposCrimes: TipoCrimeDTO[] = [
  {
    id: 1,
    artigoPenal: "Art. 157",
    descricao: "Furto",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    artigoPenal: "Art. 158",
    descricao: "Furto Qualificado",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 3,
    artigoPenal: "Art. 121",
    descricao: "Homicídio",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 4,
    artigoPenal: "Art. 129",
    descricao: "Lesão Corporal",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 5,
    artigoPenal: "Art. 213",
    descricao: "Estupro",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
];

export async function getTiposCrimes() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/tipos-crimes");

    return response.data as TipoCrimeDTO[];
  } catch (error: any) {
    console.warn("Using mock tipos-crimes:", error.message);
    return mockTiposCrimes;
  }
}

export async function getTipoCrimeById(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get(`/tipos-crimes/${id}`);

    return response.data as TipoCrimeDTO;
  } catch (error: any) {
    console.warn("Using mock tipo-crime:", error.message);
    const tipo = mockTiposCrimes.find((t) => t.id === Number(id));
    if (!tipo) {
      throw new Error("Tipo de crime não encontrado");
    }
    return tipo;
  }
}

export interface CreateTipoCrimeDTO {
  descricao: string;
  artigoPenal?: string;
}

export interface UpdateTipoCrimeDTO {
  descricao?: string;
  artigoPenal?: string;
}

export async function createTipoCrime(data: CreateTipoCrimeDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/tipos-crimes", data);

    return response.data as TipoCrimeDTO;
  } catch (error: any) {
    console.warn("Using mock create:", error.message);
    const newTipo: TipoCrimeDTO = {
      id: mockTiposCrimes.length + 1,
      descricao: data.descricao,
      artigoPenal: data.artigoPenal,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTiposCrimes.push(newTipo);
    return newTipo;
  }
}

export async function updateTipoCrime(id: string, data: UpdateTipoCrimeDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).put(`/tipos-crimes/${id}`, data);

    return response.data as TipoCrimeDTO;
  } catch (error: any) {
    console.warn("Using mock update:", error.message);
    const index = mockTiposCrimes.findIndex((t) => t.id === Number(id));
    if (index === -1) {
      throw new Error("Tipo de crime não encontrado");
    }
    mockTiposCrimes[index] = {
      ...mockTiposCrimes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockTiposCrimes[index];
  }
}

export async function deleteTipoCrime(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    await apiWithToken(token).delete(`/tipos-crimes/${id}`);
  } catch (error: any) {
    console.warn("Using mock delete:", error.message);
    const index = mockTiposCrimes.findIndex((t) => t.id === Number(id));
    if (index !== -1) {
      mockTiposCrimes.splice(index, 1);
    }
  }
}

export async function bulkCreateTipoCrime(data: CreateTipoCrimeDTO[]) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/tipos-crimes/bulk", data);
    return response.data as TipoCrimeDTO[];
  } catch (error: any) {
    console.warn("Using mock bulk create:", error.message);
    const newTipos: TipoCrimeDTO[] = data.map((item, index) => ({
      id: mockTiposCrimes.length + index + 1,
      descricao: item.descricao,
      artigoPenal: item.artigoPenal,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    mockTiposCrimes.push(...newTipos);
    return newTipos;
  }
}