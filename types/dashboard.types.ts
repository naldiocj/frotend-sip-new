// dashboard.types.ts - TypeScript interfaces for SIP Dashboard

export interface EstatisticasUsuario {
  total: number;
  ativos: number;
  inativos: number;
  online24h: number;
  semLogin: number;
}

export interface EstatisticasProcesso {
  total: number;
  emInstrucao: number;
  arquivados: number;
  remetidoJuizo: number;
  remetidoPGR: number;
  sentenciados: number;
  tramitados: number;
  comDetido: number;
  tipoNormal: number;
  averiguacao: number;
}

export interface EstatisticasMandato {
  total: number;
  pendentes: number;
  emExecucao: number;
  cumpridos: number;
  cancelados: number;
}

export interface EstatisticasRemessa {
  total: number;
  concluidas: number;
  pendentes: number;
  canceladas: number;
}

export interface EstatisticasDespacho {
  total: number;
  finalizados: number;
  pendentes: number;
}

export interface EstatisticasDiligencia {
  total: number;
  concluidas: number;
  pendentes: number;
  emAndamento: number;
}

export interface EstatisticasDetido {
  total: number;
  ativos: number;
  inativos: number;
}

export interface EstatisticasNotificacao {
  total: number;
  lidas: number;
  naoLidas: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface DashboardData {
  categorias?: Array<{ id: number; nome: string }>;
  estatisticasMandato?: EstatisticasMandato;
  estatisticasNotificacao?: EstatisticasNotificacao;
}

export interface Direccao {
  id: number;
  nome: string;
}

export interface Patente {
  id: number;
  nome: string;
}

export interface TipoCrime {
  id: number;
  nome: string;
}

export type ChartType = "pie" | "bar" | "area" | "line";

export interface SectionProps {
  isLoading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}
