import { apiWithToken } from "@/lib/api";
import { InstrutorDetailDTO } from "@/lib/dto/direcao.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

export async function getInstrutores(query?: string) {
  await requiredUser();
  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-instrutores"] },
    }).get(`/instrutores${query ? "?term=" + query : ""}`);

    return response.data as InstrutorDetailDTO[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "Ocorreu um erro ao buscar os instrutores.",
    );
  }
}
