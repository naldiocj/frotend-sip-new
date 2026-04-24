import { apiWithToken } from "@/lib/api";
import { TipoCrimeDTO } from "@/lib/dto/tipo-crime.dto";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

export async function getTiposCrimes() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/tipos-crimes");

    return response.data as TipoCrimeDTO[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching user session.",
    );
  }
}
