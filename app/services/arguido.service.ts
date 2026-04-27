import { apiWithToken } from "@/lib/api";
import { ArguidoListItem } from "@/lib/dto/arguido.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

export async function getArguidos(query?: string) {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-arguidos"] },
    }).get(`/arguidos${query ? "?term=" + query : ""}`);

    return response.data as ArguidoListItem[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Ocorreu um erro ao buscar os arguidos.",
    );
  }
}
