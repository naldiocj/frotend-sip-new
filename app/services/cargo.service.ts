"use server";

import { apiWithToken } from "@/lib/api";
import { CargoDTO } from "@/lib/dto/cargo.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";
import { revalidateTag } from "next/cache";

const mockCargos: CargoDTO[] = [
  { id: 1, nome: "Director Provincial", sigla: "DP", descricao: "Director Provincial" },
  { id: 2, nome: "Sub-Director", sigla: "SD", descricao: "Sub-Director" },
  { id: 3, nome: "Chefe de Departamento", sigla: "CD", descricao: "Chefe de Departamento" },
  { id: 4, nome: "Coordenador", sigla: "CO", descricao: "Coordenador" },
  { id: 5, nome: "Técnico", sigla: "TC", descricao: "Técnico" },
];

export async function getCargos() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/cargos");
    return response.data as CargoDTO[];
  } catch (error: any) {
    console.warn("Using mock cargos:", error.message);
    return mockCargos;
  }
}

export async function getCargoById(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get(`/cargos/${id}`);
    return response.data as CargoDTO;
  } catch (error: any) {
    console.warn("Using mock cargo:", error.message);
    const cargo = mockCargos.find((c) => c.id === Number(id));
    if (!cargo) throw new Error("Cargo não encontrado");
    return cargo;
  }
}

export async function createCargo(data: CargoDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/cargos", data);
    revalidateTag("get-cargos", {});
    return response.data as CargoDTO;
  } catch (error: any) {
    console.warn("Using mock create:", error.message);
    const novo: CargoDTO = {
      id: mockCargos.length + 1,
      nome: data.nome,
      sigla: data.sigla,
      descricao: data.descricao,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCargos.push(novo);
    return novo;
  }
}

export async function updateCargo(id: string, data: Partial<CargoDTO>) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).put(`/cargos/${id}`, data);
    revalidateTag("get-cargos", {});
    return response.data as CargoDTO;
  } catch (error: any) {
    console.warn("Using mock update:", error.message);
    const index = mockCargos.findIndex((c) => c.id === Number(id));
    if (index === -1) throw new Error("Cargo não encontrado");
    mockCargos[index] = { ...mockCargos[index], ...data, updatedAt: new Date().toISOString() };
    return mockCargos[index];
  }
}

export async function deleteCargo(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    await apiWithToken(token).delete(`/cargos/${id}`);
  } catch (error: any) {
    console.warn("Using mock delete:", error.message);
    const index = mockCargos.findIndex((c) => c.id === Number(id));
    if (index !== -1) mockCargos.splice(index, 1);
  }
}