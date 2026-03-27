import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function replaceAllChar(
  numero: string | null,
  before = "-",
  after = "-",
) {
  if (!numero) return "";

  return numero.replaceAll(before, after);
}

export function replaceChar(numero: string | null, before = "-", after = "-") {
  if (!numero) return "";

  return numero.replace(before, after);
}

export function getCrimeTexto(artigo: string) {
  if (!artigo) return "";

  return artigo.split(":")[0];
}

const urlResource = (resource: string, id: any) =>
  `${resource}/${replaceChar(id, "/", "-")}`;

export const urlPrefix = (resource: string, id: any, action: string) =>
  `${urlResource(resource, id)}/${action}`;

export function toUrl(url: string, id: string) {
  return url.replace(":id", id);
}
