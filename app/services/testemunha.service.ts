import { apiWithToken } from "@/lib/api";
import { TestemunhaListItem } from "@/lib/dto/testemunha.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

export async function getTestemunhas(query?: string) {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-testemunhas"] },
    }).get(`/testemunhas${query ? "?term=" + query : ""}`);

    return response.data as TestemunhaListItem[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "Ocorreu um erro ao buscar as testemunhas.",
    );
  }
}

