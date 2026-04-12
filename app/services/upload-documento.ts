"use server";

import { API_URL } from "@/lib/constants";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function uploadDocumento(formData: FormData) {
  try {
    const token = await getSession();
    const url = new URL(API_URL + "/processos-documentos");
    await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidateTag("get-processo-documentos", {});
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Impossível carregar o documento",
    );
  }
}
