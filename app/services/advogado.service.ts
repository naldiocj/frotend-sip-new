import { apiWithToken } from "@/lib/api";
import { AdvogadoListItem } from "@/lib/dto/advogado.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

export async function getAdvogados(query?: string) {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-advogados"] },
    }).get(`/advogados${query ? "?term=" + query : ""}`);

    return response.data as AdvogadoListItem[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "Ocorreu um erro ao buscar os advogados.",
    );
  }
}
