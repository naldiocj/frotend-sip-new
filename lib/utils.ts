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

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KiB", "MiB", "GiB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
