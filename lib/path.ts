const prefix = "/instrutor";

export const INSTRUTOR_PATHS = {
  DASHBOARD: `${prefix}/dashboard`,
  PROCESSOS: `${prefix}/processos`,
  PROCESSOS_RESUMO: `${prefix}/processos/:id`,
  PROCESSOS_DILIGENCIAS: `${prefix}/processos/:id/diligencias`,
  PROCESSOS_PARTICIPANTES: `${prefix}/processos/:id/participantes`,
  PROCESSOS_DOCUMENTOS: `${prefix}/processos/:id/documentos`,
};
