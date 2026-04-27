"use server";

import { Mandado, TipoMandado } from "@/lib/dto/mandado.dto";
import { requiredUser } from "./user.service";

const mockMandados: Mandado[] = [
  {
    id: 1,
    tipo: "MANDADO_DE_DETENCAO",
    numeroProcesso: "2024/IPJ/015",
    nomeRequerente: "Ministério Público",
    nomeExecutado: "João Manuel da Silva",
    dataEmitido: "2024-03-28T10:00:00Z",
    dataValidade: "2024-04-28T10:00:00Z",
    emitidoPor: "Dr. Ana Costa",
    estado: "PENDENTE",
  },
  {
    id: 2,
    tipo: "MANDADO_DE_CUSTODIA",
    numeroProcesso: "2024/IPJ/012",
    nomeRequerente: "Tribunal",
    nomeExecutado: "Maria de Fatima",
    dataEmitido: "2024-03-27T14:00:00Z",
    dataValidade: "2024-04-27T14:00:00Z",
    emitidoPor: "Dr. Pedro Santos",
    estado: "EM_EXECUCAO",
  },
  {
    id: 3,
    tipo: "MANDADO_DE_BUSCA_E_APREENSAO",
    numeroProcesso: "2024/IPJ/008",
    nomeRequerente: "Polícia Nacional",
    nomeExecutado: "António José",
    dataEmitido: "2024-03-26T09:00:00Z",
    dataValidade: "2024-04-26T09:00:00Z",
    emitidoPor: "Dra. Carla Rodrigues",
    estado: "CUMPRIDO",
  },
  {
    id: 4,
    tipo: "MANDADO_DE_SOLTURA",
    numeroProcesso: "2024/IPJ/003",
    nomeRequerente: "Defesa",
    nomeExecutado: "Carlos Eduardo",
    dataEmitido: "2024-03-25T16:00:00Z",
    dataValidade: "2024-04-25T16:00:00Z",
    emitidoPor: "Dr. João Manuel",
    estado: "CUMPRIDO",
  },
  {
    id: 5,
    tipo: "MANDADO_DE_CAPTURA",
    numeroProcesso: "2024/IPJ/020",
    nomeRequerente: "Ministério Público",
    nomeExecutado: "Paulo Mukamba",
    dataEmitido: "2024-03-24T11:00:00Z",
    dataValidade: "2024-04-24T11:00:00Z",
    emitidoPor: "Dr. Ana Costa",
    estado: "PENDENTE",
  },
  {
    id: 6,
    tipo: "MANDADO_DE_DETENCAO",
    numeroProcesso: "2024/IPJ/018",
    nomeRequerente: "Polícia",
    nomeExecutado: "Miguel André",
    dataEmitido: "2024-03-23T08:00:00Z",
    dataValidade: "2024-04-23T08:00:00Z",
    emitidoPor: "Dr. Pedro Santos",
    estado: "CANCELADO",
  },
  {
    id: 7,
    tipo: "MANDADO_DE_CUSTODIA",
    numeroProcesso: "2024/IPJ/022",
    nomeRequerente: "Tribunal",
    nomeExecutado: "Ricardo Silva",
    dataEmitido: "2024-03-22T13:00:00Z",
    dataValidade: "2024-04-22T13:00:00Z",
    emitidoPor: "Dra. Carla Rodrigues",
    estado: "EM_EXECUCAO",
  },
  {
    id: 8,
    tipo: "MANDADO_DE_BUSCA_E_APREENSAO",
    numeroProcesso: "2024/IPJ/025",
    nomeRequerente: "MP",
    nomeExecutado: "Empresa XYZ",
    dataEmitido: "2024-03-21T10:00:00Z",
    dataValidade: "2024-04-21T10:00:00Z",
    emitidoPor: "Dr. João Manuel",
    estado: "PENDENTE",
  },
];

export async function getMandados(
  query?: string,
  tipo?: TipoMandado,
  estado?: string,
) {
  await requiredUser();
  let filtered = [...mockMandados];

  const term = query?.toLowerCase() || "";
  if (term) {
    filtered = filtered.filter(
      (m) =>
        m.numeroProcesso.toLowerCase().includes(term) ||
        m.nomeRequerente.toLowerCase().includes(term) ||
        m.nomeExecutado.toLowerCase().includes(term) ||
        m.emitidoPor.toLowerCase().includes(term),
    );
  }

  if (tipo) {
    filtered = filtered.filter((m) => m.tipo === tipo);
  }

  if (estado) {
    filtered = filtered.filter((m) => m.estado === estado);
  }

  return filtered.sort(
    (a, b) => new Date(b.dataEmitido).getTime() - new Date(a.dataEmitido).getTime(),
  );
}