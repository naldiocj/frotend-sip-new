"use server";

import { API_URL } from "@/lib/constants";
import { getSession } from "@/lib/session";

export async function uploadDocumento(formData: FormData) {
  try {
    const token = await getSession();
    const url = API_URL + "/carregar-documentos";
    await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Impossível carregar o documento",
    );
  }
}
