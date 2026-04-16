import { apiWithToken } from "@/lib/api";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";
import { DireccaoDTO } from "@/lib/dto/direccao.dto";
import { CreateDocumentoDTO } from "@/lib/dto/documento.dto";

export async function createDocumento(data: any) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/documentos", data);

    return response.data as CreateDocumentoDTO;
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching user session.",
    );
  }
}
