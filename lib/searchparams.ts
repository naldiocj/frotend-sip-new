// @/lib/searchparams.ts
import { createSearchParamsCache, parseAsString, parseAsStringEnum } from "nuqs/server";
import { TipoMandado } from "./dto/mandado.dto";

export const parsers = {
  q: parseAsString.withDefault(""),
  lida: parseAsStringEnum(["true", "false"]).withDefault(null as any),
  tipo: parseAsStringEnum([
    "MANDADO_DE_DETENCAO",
    "MANDADO_DE_CUSTODIA",
    "MANDADO_DE_BUSCA_E_APREENSAO",
    "MANDADO_DE_SOLTURA",
    "MANDADO_DE_CAPTURA",
  ]).withDefault(null as any),
  estado: parseAsStringEnum([
    "PENDENTE",
    "EM_EXECUCAO",
    "CUMPRIDO",
    "CANCELADO",
  ]).withDefault(null as any),
};

export const searchParamsCache = createSearchParamsCache(parsers);
