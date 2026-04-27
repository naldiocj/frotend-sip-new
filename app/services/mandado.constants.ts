import { TipoMandado } from "@/lib/dto/mandado.dto";

export const TIPOS_MANDADOS: { label: string; value: TipoMandado }[] = [
  { label: "Mandado de Detenção", value: "MANDADO_DE_DETENCAO" },
  { label: "Mandado de Custódia", value: "MANDADO_DE_CUSTODIA" },
  { label: "Mandado de Busca e Apreensão", value: "MANDADO_DE_BUSCA_E_APREENSAO" },
  { label: "Mandado de Soltura", value: "MANDADO_DE_SOLTURA" },
  { label: "Mandado de Captura", value: "MANDADO_DE_CAPTURA" },
];

export const ESTADOS_MANDADOS = [
  { label: "Pendente", value: "PENDENTE" },
  { label: "Em Execução", value: "EM_EXECUCAO" },
  { label: "Cumprido", value: "CUMPRIDO" },
  { label: "Cancelado", value: "CANCELADO" },
];