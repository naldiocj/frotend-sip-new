"use server";

import { apiWithToken } from "@/lib/api";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

export interface DirecaoDTO {
  id: number;
  nome: string;
  sigla: string;
  descricao: string;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDirecaoDTO {
  nome: string;
  sigla: string;
  descricao: string;
}

const mockDirecoes: DirecaoDTO[] = [
  {
    id: 1,
    nome: "Direção de Investigação Criminal",
    sigla: "DIC",
    descricao: "Responsável pela investigação criminal",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    nome: "Direção de Polícia Judiciária",
    sigla: "DPJ",
    descricao: "Responsável pela polícia judiciária",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
];

export async function getDireccoes() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/direcoes");
    return response.data as DirecaoDTO[];
  } catch (error: any) {
    console.warn("Using mock direcoes:", error.message);
    return mockDirecoes;
  }
}

export async function createDirecao(data: CreateDirecaoDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/direcoes", data);
    return response.data as DirecaoDTO;
  } catch (error: any) {
    console.warn("Using mock create:", error.message);
    const newDirecao: DirecaoDTO = {
      id: mockDirecoes.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockDirecoes.push(newDirecao);
    return newDirecao;
  }
}

export async function bulkCreateDirecao(data: CreateDirecaoDTO[]) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/direcoes/bulk", data);
    return response.data as DirecaoDTO[];
  } catch (error: any) {
    console.warn("Using mock bulk create:", error.message);
    const newDirecoes: DirecaoDTO[] = data.map((item, index) => ({
      id: mockDirecoes.length + index + 1,
      ...item,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    mockDirecoes.push(...newDirecoes);
    return newDirecoes;
  }
}
