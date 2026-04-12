import { apiWithToken } from "@/lib/api";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";
import { DireccaoDTO } from "@/lib/dto/direccao.dto";

export async function getDireccoes() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/direcoes");

    return response.data as DireccaoDTO[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching user session.",
    );
  }
}
