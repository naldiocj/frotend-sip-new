"use server";

import { apiWithToken } from "@/lib/api";
import { DireccaoDTO } from "@/lib/dto/direccao.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

const mockDireccoes: DireccaoDTO[] = [
  { id: 1, nome: "Direção Provincial de Luanda", sigla: "DPLU", descricao: "Direção Provincial de Luanda", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
  { id: 2, nome: "Direção Provincial de Benguela", sigla: "DPBG", descricao: "Direção Provincial de Benguela", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
  { id: 3, nome: "Direção Provincial do Huambo", sigla: "DPHM", descricao: "Direção Provincial do Huambo", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
  { id: 4, nome: "Direção Provincial de Bengo", sigla: "DPBO", descricao: "Direção Provincial do Bengo", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
];

export async function getDireccoes() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/direcoes");

    return response.data as DireccaoDTO[];
  } catch (error: any) {
    console.warn("Using mock direccoes:", error.message);
    return mockDireccoes;
  }
}

export async function getDireccaoById(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get(`/direcoes/${id}`);

    return response.data as DireccaoDTO;
  } catch (error: any) {
    console.warn("Using mock direccao:", error.message);
    const direccao = mockDireccoes.find((d) => d.id === Number(id));
    if (!direccao) {
      throw new Error("Direção não encontrada");
    }
    return direccao;
  }
}

export interface CreateDireccaoDTO {
  nome: string;
  sigla: string;
  descricao?: string;
}

export interface UpdateDireccaoDTO {
  nome?: string;
  sigla?: string;
  descricao?: string;
}

export async function createDireccao(data: CreateDireccaoDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/direcoes", data);

    return response.data as DireccaoDTO;
  } catch (error: any) {
    console.warn("Using mock create:", error.message);
    const nova: DireccaoDTO = {
      id: mockDireccoes.length + 1,
      nome: data.nome,
      sigla: data.sigla,
      descricao: data.descricao || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockDireccoes.push(nova);
    return nova;
  }
}

export async function updateDireccao(id: string, data: UpdateDireccaoDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).put(`/direcoes/${id}`, data);

    return response.data as DireccaoDTO;
  } catch (error: any) {
    console.warn("Using mock update:", error.message);
    const index = mockDireccoes.findIndex((d) => d.id === Number(id));
    if (index === -1) {
      throw new Error("Direção não encontrada");
    }
    mockDireccoes[index] = {
      ...mockDireccoes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockDireccoes[index];
  }
}

export async function deleteDireccao(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    await apiWithToken(token).delete(`/direcoes/${id}`);
  } catch (error: any) {
    console.warn("Using mock delete:", error.message);
    const index = mockDireccoes.findIndex((d) => d.id === Number(id));
    if (index !== -1) {
      mockDireccoes.splice(index, 1);
    }
  }
}

interface AtribuirDireccaoDTO {
  processoId: number;
  direccaoId: number;
}

export async function atribuirDirecao(data: AtribuirDireccaoDTO) {
  try {
    const token = await getSession();
await apiWithToken(token).patch(`/processos/${data.processoId}`, {
      "DireçãoId": data.direccaoId,
    });
  } catch (error: any) {
    console.warn("Error assigning direction:", error.message);
    throw new Error("Impossível atribuir a direção ao processo");
  }
}

interface AtribuirInstrutorDTO {
  processoId: number;
  instrutorId: number;
}

export async function atribuirInstrutor(data: AtribuirInstrutorDTO) {
  try {
    const token = await getSession();
    await apiWithToken(token).patch(`/processos/${data.processoId}`, {
      instrutorId: data.instrutorId,
    });
  } catch (error: any) {
    console.warn("Error assigning instructor:", error.message);
    throw new Error("Impossível atribuir instrutor ao processo");
  }
}