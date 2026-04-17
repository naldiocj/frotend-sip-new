"use server";

import { API_UPLOAD_URL } from "@/lib/constants";
import { getSession } from "@/lib/session";
import { requiredUser } from "./user.service";

export async function fileExists(url: any) {
  await requiredUser();

  const token = await getSession();
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_UPLOAD_URL}${url}`, {
      headers,
    });

    if (!response.ok) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}
