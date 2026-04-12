import { apiWithToken } from "@/lib/api";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";
import { InstrutorDetailDTO } from "@/lib/dto/direcao.dto";

export async function getInstrutores(direcaoId: string) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get(
      `/instrutores/direcoes/${direcaoId}`,
    );

    return response.data as InstrutorDetailDTO[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching user session.",
    );
  }
}
