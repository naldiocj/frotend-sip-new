import { apiWithToken } from "@/lib/api";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

export async function getCategorias() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/categorias");

    return response.data;
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching user session.",
    );
  }
}
