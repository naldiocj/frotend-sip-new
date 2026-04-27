"use server";

import { apiWithToken } from "@/lib/api";
import { SecretariaDTO } from "@/lib/dto/secretaria.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

const mockSecretarias: SecretariaDTO[] = [
  {
    id: 1,
    nomeCompleto: "Secretaria Geral",
    codigo: "SG",
    descricao: "Secretaria Geral do Ministério Público",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    nomeCompleto: "Secretaria de Instrução",
    codigo: "SI",
    descricao: "Secretaria de Instrução Criminal",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 3,
    nomeCompleto: "Secretaria de Arquivo",
    codigo: "SA",
    descricao: "Secretaria de Arquivo e Distribuição",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
];

export async function getSecretarias() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/secretarias");

    return response as SecretariaDTO[]; // Todo after change to response.data
  } catch (error: any) {
    console.warn("Using mock secretarias:", error.message);
    return mockSecretarias;
  }
}

export async function getSecretariaById(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get(`/secretarias/${id}`);

    return response.data as SecretariaDTO;
  } catch (error: any) {
    console.warn("Using mock secretaria:", error.message);
    const secretaria = mockSecretarias.find((s) => s.id === Number(id));
    if (!secretaria) {
      throw new Error("Secretaria não encontrada");
    }
    return secretaria;
  }
}

export interface CreateSecretariaDTO {
  nomeCompleto: string;
  codigo: string;
  descricao?: string;
}

export interface UpdateSecretariaDTO {
  nome?: string;
  codigo?: string;
  descricao?: string;
}

export async function createSecretaria(data: CreateSecretariaDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/secretarias", data);

    return response.data as SecretariaDTO;
  } catch (error: any) {
    console.warn("Using mock create:", error.message);
    const nova: SecretariaDTO = {
      id: mockSecretarias.length + 1,
      nomeCompleto: data.nomeCompleto,
      codigo: data.codigo,
      descricao: data.descricao || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockSecretarias.push(nova);
    return nova;
  }
}

export async function updateSecretaria(id: string, data: UpdateSecretariaDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).put(`/secretarias/${id}`, data);

    return response.data as SecretariaDTO;
  } catch (error: any) {
    console.warn("Using mock update:", error.message);
    const index = mockSecretarias.findIndex((s) => s.id === Number(id));
    if (index === -1) {
      throw new Error("Secretaria não encontrada");
    }
    mockSecretarias[index] = {
      ...mockSecretarias[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockSecretarias[index];
  }
}

export async function deleteSecretaria(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    await apiWithToken(token).delete(`/secretarias/${id}`);
  } catch (error: any) {
    console.warn("Using mock delete:", error.message);
    const index = mockSecretarias.findIndex((s) => s.id === Number(id));
    if (index !== -1) {
      mockSecretarias.splice(index, 1);
    }
  }
}
