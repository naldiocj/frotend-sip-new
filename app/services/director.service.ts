import { apiWithToken } from "@/lib/api";
import { InstrutorDetailDTO } from "@/lib/dto/direcao.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

export async function getInstrutor(userId: string | null) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get(`/instrutores/${userId}`);

    return response.data as InstrutorDetailDTO[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching user session.",
    );
  }
}

export async function getInstrutores(direcaoId: string | null) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get(
      `/instrutores/direcoes/${direcaoId}`,
    );

    console.log(response.data);

    return response.data as InstrutorDetailDTO[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching user session.",
    );
  }
}
