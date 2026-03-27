// @/lib/searchparams.ts
import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const parsers = {
  // O parâmetro 'q' será uma string, se vazio será ""
  q: parseAsString.withDefault(""),
};

export const searchParamsCache = createSearchParamsCache(parsers);
