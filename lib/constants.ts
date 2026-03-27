export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const APP_NAME = "SIP+360º";

export const ACCESS_TOKEN = "access_token";
export const USER_SESSION = "user_session";

export const EXPIRE_TIME_ACCESS_TOKEN = 7 * 24 * 60 * 60 * 1000;

export const PATHS = {
  DASHBOARD: "/dashboard",
  LOGIN: "/",
  PROCESSOS: "/",
};

export const ROLES = {
  ADMIN: "ADMIN",
  DIRECTOR: "DIRECTOR",
  INSTRUTOR: "INSTRUTOR",
  SECRETARIA: "SECRETARIA",
  PGR: "PGR",
  PIQUETE: "PIQUETE",
} as const;

export const PARTICIPANTES = {
  QUEIXOSO: "QUEIXOSO",
  ARGUIDO: "ARGUIDO",
  TESTEMUNHA: "TESTEMUNHA",
  ADVOGADO: "ADVOGADO",
} as const;
