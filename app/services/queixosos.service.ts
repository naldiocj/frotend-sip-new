import { apiWithToken } from "@/lib/api";
import { QueixosoListItem } from "@/lib/dto/queixoso.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

export async function getQueixosos(query?: string) {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-queixosos"] },
    }).get(`/queixosos${query ? "?term=" + query : ""}`);

    return response.data as QueixosoListItem[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "Ocorreu um erro ao buscar os queixosos.",
    );
  }
}
