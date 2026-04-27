"use server";

import { apiWithToken } from "@/lib/api";
import { DetidoDTO, CreateDetidoDTO, UpdateDetidoDTO } from "@/lib/dto/detido.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

const mockDetidos: DetidoDTO[] = [
  {
    id: 1,
    numeroProcesso: "PROC/2024/001",
    nomeCompleto: "João Manuel Lopes",
    nomePai: "Manuel Antonio Lopes",
    nomeMae: "Maria do Carmo Lopes",
    dataNascimento: "1990-05-15",
    naturalidade: "Luanda",
    profissao: "Motorista",
    numeroBi: "002454321",
    dataEmissaoBi: "2020-01-15",
    localEmissaoBi: "Luanda",
    telefone: "+244 923 456 789",
    endereco: "Luanda, Rua do Kinaxikele, Nr 45",
    EstadoCivil: "SOLTEIRO",
    idade: 34,
    sexo: "MASCULINO",
    estadoDetencao: "DETIDO",
    dataDetencao: "2024-03-15",
    localDetencao: "Comando Provincial de Luanda",
    motivoDetencao: "Flagrante",
    observacoes: "Detido em operação",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
  },
  {
    id: 2,
    numeroProcesso: "PROC/2024/002",
    nomeCompleto: "António Carlos Pinto",
    nomePai: "Carlos João Pinto",
    nomeMae: "Ana Maria Pinto",
    dataNascimento: "1985-08-22",
    naturalidade: "Benguela",
    profissao: "Empresário",
    numeroBi: "001234567",
    dataEmissaoBi: "2019-06-20",
    localEmissaoBi: "Benguela",
    telefone: "+244 937 654 321",
    endereco: "Luanda, Avenida 4 de Fevereiro, Nr 120",
    EstadoCivil: "CASADO",
    idade: 39,
    sexo: "MASCULINO",
    estadoDetencao: "TRANSITO",
    dataDetencao: "2024-03-14",
    localDetencao: "Estabelecimento Prisional",
    motivoDetencao: "Mandado Judicial",
    observacoes: "Em transferência",
    createdAt: "2024-03-14T09:30:00Z",
    updatedAt: "2024-03-14T09:30:00Z",
  },
  {
    id: 3,
    numeroProcesso: "PROC/2024/003",
    nomeCompleto: "Manuel José da Silva",
    nomePai: "José António Silva",
    nomeMae: "Maria Rosa Silva",
    dataNascimento: "1978-12-10",
    naturalidade: "Huambo",
    profissao: "Agricultor",
    numeroBi: "003345678",
    dataEmissaoBi: "2021-03-10",
    localEmissaoBi: "Huambo",
    telefone: "+244 991 234 567",
    endereco: "Benguela, Rua Principal, Nr 8",
    EstadoCivil: "CASADO",
    idade: 46,
    sexo: "MASCULINO",
    estadoDetencao: "LIBERTADO",
    dataDetencao: "2024-03-01",
    localDetencao: "Comando Provincial",
    motivoDetencao: "Investigação",
    observacoes: "Liberto sob custódia",
    createdAt: "2024-03-13T14:15:00Z",
    updatedAt: "2024-03-13T14:15:00Z",
  },
  {
    id: 4,
    numeroProcesso: "PROC/2024/004",
    nomeCompleto: "Francisco Mbala",
    nomePai: "Sebastião Mbala",
    nomeMae: "Maria Mbala",
    dataNascimento: "1995-02-28",
    naturalidade: "Luanda",
    profissao: "Estudante",
    numeroBi: "004456789",
    dataEmissaoBi: "2022-08-15",
    localEmissaoBi: "Luanda",
    telefone: "+244 912 345 678",
    endereco: "Huambo, Bairro Casimba",
    EstadoCivil: "SOLTEIRO",
    idade: 29,
    sexo: "MASCULINO",
    estadoDetencao: "DETIDO",
    dataDetencao: "2024-03-12",
    localDetencao: "Comando Provincial de Luanda",
    motivoDetencao: "Flagrante",
    observacoes: "Aguarda julgamento",
    createdAt: "2024-03-12T11:00:00Z",
    updatedAt: "2024-03-12T11:00:00Z",
  },
  {
    id: 5,
    numeroProcesso: "PROC/2024/005",
    nomeCompleto: "José Eduardo Nascimento",
    nomePai: "Eduardo Alberto Nascimento",
    nomeMae: "Carla Nascimento",
    dataNascimento: "1982-07-04",
    naturalidade: "Luanda",
    profissao: "Engenheiro",
    numeroBi: "005567890",
    dataEmissaoBi: "2018-11-22",
    localEmissaoBi: "Luanda",
    telefone: "+244 938 765 432",
    endereco: "Luanda, Talatona, Rua das Flores",
    EstadoCivil: "CASADO",
    idade: 42,
    sexo: "MASCULINO",
    estadoDetencao: "DETIDO",
    dataDetencao: "2024-03-11",
    localDetencao: "Comando Provincial",
    motivoDetencao: "Investigação",
    observacoes: "Em preventiva",
    createdAt: "2024-03-11T16:45:00Z",
    updatedAt: "2024-03-11T16:45:00Z",
  },
];

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
    console.warn("Using mock data for detidos (API unavailable):", error.message);
    let filtered = [...mockDetidos];
    if (query) {
      const term = query.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.nomeCompleto.toLowerCase().includes(term) ||
          d.numeroBi.toLowerCase().includes(term),
      );
    }
    return filtered;
  }
}

export async function getDetidoById(id: string): Promise<DetidoDTO> {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token).get(`/detidos/${id}`);

    return response.data as DetidoDTO;
  } catch (error: any) {
    console.warn("Using mock data for detido:", error.message);
    const detido = mockDetidos.find((d) => d.id === Number(id));
    if (!detido) {
      throw new Error("Detido não encontrado");
    }
    return detido;
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