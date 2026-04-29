"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

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

export interface ChartData {
  name: string;
  value: number;
}

async function fetchWithAuth(endpoint: string) {
  const response = await api.get(`${API_BASE}${endpoint}`);
  return response.data?.data || response.data || response;
}

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchWithAuth("/dashboard"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProcessos() {
  return useQuery({
    queryKey: ["processos"],
    queryFn: () => fetchWithAuth("/dashboard/processos"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUsuarios() {
  return useQuery({
    queryKey: ["usuarios"],
    queryFn: () => fetchWithAuth("/dashboard/usuarios"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUsuarioEstatisticas() {
  return useQuery({
    queryKey: ["usuario-estatisticas"],
    queryFn: () => fetchWithAuth("/dashboard/usuarios/estatisticas"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUsuarioEvolucao(meses: number = 6) {
  return useQuery({
    queryKey: ["usuario-evolucao", meses],
    queryFn: () => fetchWithAuth(`/dashboard/usuarios/evolucao?meses=${meses}`),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUsuariosPorDireccao() {
  return useQuery({
    queryKey: ["usuarios-por-direccao"],
    queryFn: () => fetchWithAuth("/dashboard/usuarios/por-direccao"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUsuariosPorFuncao() {
  return useQuery({
    queryKey: ["usuarios-por-funcao"],
    queryFn: () => fetchWithAuth("/dashboard/usuarios/por-funcao"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProcessoEstatisticas() {
  return useQuery({
    queryKey: ["processo-estatisticas"],
    queryFn: () => fetchWithAuth("/dashboard/processos/estatisticas"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProcessoEvolucao(meses: number = 6) {
  return useQuery({
    queryKey: ["processo-evolucao", meses],
    queryFn: () => fetchWithAuth(`/dashboard/processos/evolucao?meses=${meses}`),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProcessosPorEstado() {
  return useQuery({
    queryKey: ["processos-por-estado"],
    queryFn: () => fetchWithAuth("/dashboard/processos/por-estado"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProcessosPorTipo() {
  return useQuery({
    queryKey: ["processos-por-tipo"],
    queryFn: () => fetchWithAuth("/dashboard/processos/por-tipo"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProcessosPorDireccao() {
  return useQuery({
    queryKey: ["processos-por-direccao"],
    queryFn: () => fetchWithAuth("/dashboard/processos/por-direccao"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProcessosPorTipoCrime() {
  return useQuery({
    queryKey: ["processos-por-tipo-crime"],
    queryFn: () => fetchWithAuth("/dashboard/processos/por-tipo-crime"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useMandatoEstatisticas() {
  return useQuery({
    queryKey: ["mandato-estatisticas"],
    queryFn: () => fetchWithAuth("/dashboard/mandatos/estatisticas"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useMandatosPorEstado() {
  return useQuery({
    queryKey: ["mandatos-por-estado"],
    queryFn: () => fetchWithAuth("/dashboard/mandatos/por-estado"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useRemessaEstatisticas() {
  return useQuery({
    queryKey: ["remessa-estatisticas"],
    queryFn: () => fetchWithAuth("/dashboard/remessas/estatisticas"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useRemessasPorStatus() {
  return useQuery({
    queryKey: ["remessas-por-status"],
    queryFn: () => fetchWithAuth("/dashboard/remessas/por-status"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useNotificacaoEstatisticas(usuarioId?: number) {
  return useQuery({
    queryKey: ["notificacao-estatisticas", usuarioId],
    queryFn: () => fetchWithAuth(`/dashboard/notificacoes/estatisticas${usuarioId ? `?usuarioId=${usuarioId}` : ""}`),
    staleTime: 1000 * 60 * 2,
  });
}

export function useDespachoEstatisticas() {
  return useQuery({
    queryKey: ["despacho-estatisticas"],
    queryFn: () => fetchWithAuth("/dashboard/despachos/estatisticas"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDespachosPorEstado() {
  return useQuery({
    queryKey: ["despachos-por-estado"],
    queryFn: () => fetchWithAuth("/dashboard/despachos/por-estado"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDiligenciaEstatisticas() {
  return useQuery({
    queryKey: ["diligencia-estatisticas"],
    queryFn: () => fetchWithAuth("/dashboard/diligencias/estatisticas"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDiligenciasPorEstado() {
  return useQuery({
    queryKey: ["diligencias-por-estado"],
    queryFn: () => fetchWithAuth("/dashboard/diligencias/por-estado"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDetidoEstatisticas() {
  return useQuery({
    queryKey: ["detido-estatisticas"],
    queryFn: () => fetchWithAuth("/dashboard/detidos/estatisticas"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCategorias() {
  return useQuery({
    queryKey: ["dashboard-categorias"],
    queryFn: () => fetchWithAuth("/dashboard/categorias"),
    staleTime: 1000 * 60 * 10,
  });
}

export function useDireccoes() {
  return useQuery({
    queryKey: ["dashboard-direccoes"],
    queryFn: () => fetchWithAuth("/dashboard/direccoes"),
    staleTime: 1000 * 60 * 10,
  });
}

export function usePatentes() {
  return useQuery({
    queryKey: ["dashboard-patentes"],
    queryFn: () => fetchWithAuth("/dashboard/patentes"),
    staleTime: 1000 * 60 * 10,
  });
}

export function useTiposCrimes() {
  return useQuery({
    queryKey: ["dashboard-tipos-crimes"],
    queryFn: () => fetchWithAuth("/dashboard/tipos-crimes"),
    staleTime: 1000 * 60 * 10,
  });
}

export function useDashboardData() {
  const usuarioStats = useUsuarioEstatisticas();
  const usuarioEvolucao = useUsuarioEvolucao();
  const usuariosPorDireccao = useUsuariosPorDireccao();
  const usuariosPorFuncao = useUsuariosPorFuncao();
  const processoStats = useProcessoEstatisticas();
  const processoEvolucao = useProcessoEvolucao();
  const processosPorEstado = useProcessosPorEstado();
  const processosPorTipo = useProcessosPorTipo();
  const processosPorDireccao = useProcessosPorDireccao();
  const processosPorTipoCrime = useProcessosPorTipoCrime();
  const mandatoStats = useMandatoEstatisticas();
  const mandatosPorEstado = useMandatosPorEstado();
  const remessaStats = useRemessaEstatisticas();
  const remessasPorStatus = useRemessasPorStatus();
  const notificacaoStats = useNotificacaoEstatisticas();
  const despachoStats = useDespachoEstatisticas();
  const despachosPorEstado = useDespachosPorEstado();
  const diligenciaStats = useDiligenciaEstatisticas();
  const diligenciasPorEstado = useDiligenciasPorEstado();
  const detidoStats = useDetidoEstatisticas();
  const categorias = useCategorias();
  const direccoes = useDireccoes();
  const patentes = usePatentes();
  const tiposCrimes = useTiposCrimes();

  const isLoading =
    usuarioStats.isLoading ||
    processoStats.isLoading ||
    mandatoStats.isLoading ||
    remessaStats.isLoading ||
    notificacaoStats.isLoading ||
    despachoStats.isLoading ||
    diligenciaStats.isLoading ||
    detidoStats.isLoading ||
    categorias.isLoading ||
    direccoes.isLoading ||
    patentes.isLoading ||
    tiposCrimes.isLoading;

  return {
    usuarioStats,
    usuarioEvolucao,
    usuariosPorDireccao,
    usuariosPorFuncao,
    processoStats,
    processoEvolucao,
    processosPorEstado,
    processosPorTipo,
    processosPorDireccao,
    processosPorTipoCrime,
    mandatoStats,
    mandatosPorEstado,
    remessaStats,
    remessasPorStatus,
    notificacaoStats,
    despachoStats,
    despachosPorEstado,
    diligenciaStats,
    diligenciasPorEstado,
    detidoStats,
    categorias,
    direccoes,
    patentes,
    tiposCrimes,
    isLoading,
  };
}