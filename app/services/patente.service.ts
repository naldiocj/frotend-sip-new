import { apiWithToken } from "@/lib/api";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";
import { PatenteDTO } from "@/lib/dto/patente.dto";

export async function getPatentes() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/patentes");

    return response.data as PatenteDTO[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching user session.",
    );
  }
}
